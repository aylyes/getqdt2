import express from 'express';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';

const prisma = new PrismaClient();
const router = express.Router();

// Get all jobs
router.get('/', async (req, res) => {
  try {
    const jobs = await prisma.job.findMany({
      orderBy: {
        createdAt: 'desc'
      },
      include: {
        metrics: true,
        alerts: true
      }
    });

    res.json(jobs);
  } catch (error) {
    console.error('Failed to fetch jobs:', error);
    res.status(500).json({ error: 'Failed to fetch jobs' });
  }
});

// Add run job endpoint
router.post('/:id/run', async (req, res) => {
  try {
    const job = await prisma.job.update({
      where: { id: req.params.id },
      data: {
        status: 'running',
        lastRun: new Date(),
        nextRun: new Date(Date.now() + 24 * 60 * 60 * 1000), // Next run in 24 hours
      },
    });

    // Simulate job execution
    setTimeout(async () => {
      await prisma.job.update({
        where: { id: req.params.id },
        data: {
          status: 'success',
        },
      });
    }, 5000);

    res.json(job);
  } catch (error) {
    res.status(500).json({ error: 'Failed to run job' });
  }
});

// Get job by ID
router.get('/:id', async (req, res) => {
  try {
    const job = await prisma.job.findUnique({
      where: { id: req.params.id },
      include: {
        metrics: true,
        alerts: true
      }
    });

    if (!job) {
      return res.status(404).json({ error: 'Job not found' });
    }

    res.json(job);
  } catch (error) {
    console.error('Failed to fetch job:', error);
    res.status(500).json({ error: 'Failed to fetch job' });
  }
});

// Create new job
router.post('/', async (req, res) => {
  try {
    const jobSchema = z.object({
      name: z.string().min(1),
      type: z.string(),
      description: z.string().optional(),
      schedule: z.string(),
      timeout: z.number().min(1),
      retries: z.number().min(0),
      customCron: z.string().optional(),
    });

    const validatedData = jobSchema.parse(req.body);

    const job = await prisma.job.create({
      data: {
        ...validatedData,
        status: 'active'
      }
    });

    res.status(201).json(job);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors });
    }
    console.error('Failed to create job:', error);
    res.status(500).json({ error: 'Failed to create job' });
  }
});

// Update job
router.put('/:id', async (req, res) => {
  try {
    const jobSchema = z.object({
      name: z.string().min(1),
      type: z.string(),
      description: z.string().optional(),
      schedule: z.string(),
      timeout: z.number().min(1),
      retries: z.number().min(0),
      customCron: z.string().optional(),
      status: z.string()
    });

    const validatedData = jobSchema.parse(req.body);

    const job = await prisma.job.update({
      where: { id: req.params.id },
      data: validatedData
    });

    res.json(job);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors });
    }
    console.error('Failed to update job:', error);
    res.status(500).json({ error: 'Failed to update job' });
  }
});

// Delete job
router.delete('/:id', async (req, res) => {
  try {
    await prisma.job.delete({
      where: { id: req.params.id }
    });

    res.status(204).send();
  } catch (error) {
    console.error('Failed to delete job:', error);
    res.status(500).json({ error: 'Failed to delete job' });
  }
});

export { router as jobsRouter };