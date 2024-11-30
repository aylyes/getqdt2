import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Create default admin user
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@getqdt.com' },
    update: {},
    create: {
      email: 'admin@getqdt.com',
      password: 'test432FFEZ5423', // In production, this should be hashed
      name: 'Admin User',
      role: 'admin'
    },
  });

  // Create sample job
  const qualityJob = await prisma.job.create({
    data: {
      name: 'Daily Quality Check',
      type: 'Quality Analysis',
      status: 'active',
      description: 'Automated daily quality check for all dashboards',
      schedule: 'daily',
      timeout: 30,
      retries: 3,
    },
  });

  // Create sample connector
  const tableauConnector = await prisma.connector.create({
    data: {
      name: 'Production Tableau Server',
      type: 'tableau',
      status: 'connected',
      config: JSON.stringify({
        url: 'https://tableau.company.com',
        site: 'default',
        username: 'admin'
      }),
    },
  });

  // Create sample scenario
  await prisma.scenario.create({
    data: {
      name: 'Daily Dashboard Quality',
      description: 'Verify data quality across all dashboards',
      status: 'active',
      format: 'json',
      sourceConnectorId: tableauConnector.id,
      sourceConfig: JSON.stringify({
        dashboards: ['Sales', 'Marketing', 'Finance'],
        metrics: ['loadTime', 'errorRate', 'userCount']
      }),
      validationConfig: JSON.stringify({
        rules: ['completeness', 'accuracy', 'consistency'],
        thresholds: {
          loadTime: 5000,
          errorRate: 0.01
        }
      }),
    },
  });

  // Create sample metrics
  await prisma.metric.createMany({
    data: [
      {
        jobId: qualityJob.id,
        name: 'Load Time',
        value: 1.5,
        unit: 'seconds',
        type: 'performance'
      },
      {
        jobId: qualityJob.id,
        name: 'Error Rate',
        value: 0.02,
        unit: 'percentage',
        type: 'quality'
      },
      {
        jobId: qualityJob.id,
        name: 'User Count',
        value: 150,
        type: 'usage'
      }
    ]
  });

  // Create sample alert
  await prisma.alert.create({
    data: {
      jobId: qualityJob.id,
      type: 'warning',
      message: 'Dashboard load time exceeds threshold',
      status: 'active'
    }
  });

  console.log('Database has been seeded. 🌱');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });