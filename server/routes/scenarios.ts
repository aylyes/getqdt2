import express from 'express';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';

const prisma = new PrismaClient();
const router = express.Router();

// Get all scenarios
router.get('/', async (req, res) => {
  try {
    const scenarios = await prisma.scenario.findMany({
      orderBy: {
        createdAt: 'desc'
      },
      include: {
        sourceConnector: true
      }
    });

    res.json(scenarios);
  } catch (error) {
    console.error('Failed to fetch scenarios:', error);
    res.status(500).json({ error: 'Failed to fetch scenarios' });
  }
});

// Get scenario by ID
router.get('/:id', async (req, res) => {
  try {
    const scenario = await prisma.scenario.findUnique({
      where: { id: req.params.id },
      include: {
        sourceConnector: true
      }
    });

    if (!scenario) {
      return res.status(404).json({ error: 'Scenario not found' });
    }

    res.json(scenario);
  } catch (error) {
    console.error('Failed to fetch scenario:', error);
    res.status(500).json({ error: 'Failed to fetch scenario' });
  }
});

// Create new scenario
router.post('/', async (req, res) => {
  try {
    const scenarioSchema = z.object({
      name: z.string().min(1),
      description: z.string().optional(),
      format: z.enum(['sql', 'csv', 'yaml', 'json']),
      sourceConnectorId: z.string(),
      sourceConfig: z.object({
        query: z.string().optional(),
        table: z.string().optional(),
        path: z.string().optional(),
        bucket: z.string().optional(),
        dataset: z.string().optional()
      }).or(z.string()),
      validationConfig: z.object({
        rules: z.array(z.string()),
        thresholds: z.object({
          accuracy: z.number(),
          completeness: z.number(),
          timeliness: z.number()
        })
      }).or(z.string())
    });

    const validatedData = scenarioSchema.parse(req.body);

    const scenario = await prisma.scenario.create({
      data: {
        ...validatedData,
        status: 'active',
        sourceConfig: typeof validatedData.sourceConfig === 'string' 
          ? validatedData.sourceConfig 
          : JSON.stringify(validatedData.sourceConfig),
        validationConfig: typeof validatedData.validationConfig === 'string'
          ? validatedData.validationConfig
          : JSON.stringify(validatedData.validationConfig)
      }
    });

    res.status(201).json(scenario);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors });
    }
    console.error('Failed to create scenario:', error);
    res.status(500).json({ error: 'Failed to create scenario' });
  }
});

// Update scenario
router.put('/:id', async (req, res) => {
  try {
    const scenarioSchema = z.object({
      name: z.string().min(1),
      description: z.string().optional(),
      format: z.enum(['sql', 'csv', 'yaml', 'json']),
      sourceConnectorId: z.string(),
      sourceConfig: z.object({
        query: z.string().optional(),
        table: z.string().optional(),
        path: z.string().optional(),
        bucket: z.string().optional(),
        dataset: z.string().optional()
      }).or(z.string()),
      validationConfig: z.object({
        rules: z.array(z.string()),
        thresholds: z.object({
          accuracy: z.number(),
          completeness: z.number(),
          timeliness: z.number()
        })
      }).or(z.string()),
      status: z.string()
    });

    const validatedData = scenarioSchema.parse(req.body);

    const scenario = await prisma.scenario.update({
      where: { id: req.params.id },
      data: {
        ...validatedData,
        sourceConfig: typeof validatedData.sourceConfig === 'string'
          ? validatedData.sourceConfig
          : JSON.stringify(validatedData.sourceConfig),
        validationConfig: typeof validatedData.validationConfig === 'string'
          ? validatedData.validationConfig
          : JSON.stringify(validatedData.validationConfig)
      }
    });

    res.json(scenario);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors });
    }
    console.error('Failed to update scenario:', error);
    res.status(500).json({ error: 'Failed to update scenario' });
  }
});

// Delete scenario
router.delete('/:id', async (req, res) => {
  try {
    await prisma.scenario.delete({
      where: { id: req.params.id }
    });

    res.status(204).send();
  } catch (error) {
    console.error('Failed to delete scenario:', error);
    res.status(500).json({ error: 'Failed to delete scenario' });
  }
});

// Run scenario
router.post('/:id/run', async (req, res) => {
  try {
    const scenario = await prisma.scenario.update({
      where: { id: req.params.id },
      data: {
        status: 'running',
        lastRun: new Date()
      }
    });

    // Simulate scenario execution
    setTimeout(async () => {
      await prisma.scenario.update({
        where: { id: req.params.id },
        data: {
          status: 'active',
          steps: scenario.steps + 1
        }
      });
    }, 5000);

    res.json({
      status: 'success',
      message: 'Scenario execution started',
      scenario
    });
  } catch (error) {
    console.error('Failed to run scenario:', error);
    res.status(500).json({ error: 'Failed to run scenario' });
  }
});

export { router as scenariosRouter };