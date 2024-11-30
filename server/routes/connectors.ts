import express from 'express';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';

const prisma = new PrismaClient();
const router = express.Router();

// Get all connectors
router.get('/', async (req, res) => {
  try {
    const connectors = await prisma.connector.findMany({
      orderBy: {
        createdAt: 'desc'
      },
      include: {
        scenarios: true
      }
    });

    res.json(connectors);
  } catch (error) {
    console.error('Failed to fetch connectors:', error);
    res.status(500).json({ error: 'Failed to fetch connectors' });
  }
});

// Get connector by ID
router.get('/:id', async (req, res) => {
  try {
    const connector = await prisma.connector.findUnique({
      where: { id: req.params.id },
      include: {
        scenarios: true
      }
    });

    if (!connector) {
      return res.status(404).json({ error: 'Connector not found' });
    }

    res.json(connector);
  } catch (error) {
    console.error('Failed to fetch connector:', error);
    res.status(500).json({ error: 'Failed to fetch connector' });
  }
});

// Create new connector
router.post('/', async (req, res) => {
  try {
    const connectorSchema = z.object({
      name: z.string().min(1),
      type: z.string(),
      config: z.object({
        url: z.string().url(),
        authMethod: z.string(),
        credentials: z.object({
          clientId: z.string().optional(),
          clientSecret: z.string().optional(),
          username: z.string().optional(),
          password: z.string().optional(),
          apiKey: z.string().optional()
        }),
        settings: z.object({
          timeout: z.string(),
          maxRetries: z.string(),
          sslVerify: z.boolean(),
          cacheEnabled: z.boolean()
        }),
        advanced: z.object({
          customHeaders: z.string().optional(),
          proxyUrl: z.string().optional(),
          tags: z.array(z.string())
        })
      })
    });

    const validatedData = connectorSchema.parse(req.body);

    const connector = await prisma.connector.create({
      data: {
        name: validatedData.name,
        type: validatedData.type,
        status: 'connected',
        config: JSON.stringify(validatedData.config)
      }
    });

    res.status(201).json(connector);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors });
    }
    console.error('Failed to create connector:', error);
    res.status(500).json({ error: 'Failed to create connector' });
  }
});

// Update connector
router.put('/:id', async (req, res) => {
  try {
    const connectorSchema = z.object({
      name: z.string().min(1),
      type: z.string(),
      status: z.string(),
      config: z.object({
        url: z.string().url(),
        authMethod: z.string(),
        credentials: z.object({
          clientId: z.string().optional(),
          clientSecret: z.string().optional(),
          username: z.string().optional(),
          password: z.string().optional(),
          apiKey: z.string().optional()
        }),
        settings: z.object({
          timeout: z.string(),
          maxRetries: z.string(),
          sslVerify: z.boolean(),
          cacheEnabled: z.boolean()
        }),
        advanced: z.object({
          customHeaders: z.string().optional(),
          proxyUrl: z.string().optional(),
          tags: z.array(z.string())
        })
      })
    });

    const validatedData = connectorSchema.parse(req.body);

    const connector = await prisma.connector.update({
      where: { id: req.params.id },
      data: {
        name: validatedData.name,
        type: validatedData.type,
        status: validatedData.status,
        config: JSON.stringify(validatedData.config)
      }
    });

    res.json(connector);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors });
    }
    console.error('Failed to update connector:', error);
    res.status(500).json({ error: 'Failed to update connector' });
  }
});

// Delete connector
router.delete('/:id', async (req, res) => {
  try {
    await prisma.connector.delete({
      where: { id: req.params.id }
    });

    res.status(204).send();
  } catch (error) {
    console.error('Failed to delete connector:', error);
    res.status(500).json({ error: 'Failed to delete connector' });
  }
});

// Test connection
router.post('/:id/test', async (req, res) => {
  try {
    const connector = await prisma.connector.findUnique({
      where: { id: req.params.id }
    });

    if (!connector) {
      return res.status(404).json({ error: 'Connector not found' });
    }

    // Simulate connection test
    await new Promise(resolve => setTimeout(resolve, 2000));

    res.json({ 
      status: 'success',
      message: 'Connection test successful',
      details: {
        latency: '120ms',
        timestamp: new Date().toISOString()
      }
    });
  } catch (error) {
    console.error('Failed to test connection:', error);
    res.status(500).json({ error: 'Failed to test connection' });
  }
});

// Sync connector data
router.post('/:id/sync', async (req, res) => {
  try {
    const connector = await prisma.connector.update({
      where: { id: req.params.id },
      data: {
        status: 'syncing',
        lastSync: new Date()
      }
    });

    // Simulate sync process
    setTimeout(async () => {
      await prisma.connector.update({
        where: { id: req.params.id },
        data: {
          status: 'connected'
        }
      });
    }, 5000);

    res.json({
      status: 'success',
      message: 'Sync started successfully',
      connector
    });
  } catch (error) {
    console.error('Failed to start sync:', error);
    res.status(500).json({ error: 'Failed to start sync' });
  }
});

export { router as connectorsRouter };