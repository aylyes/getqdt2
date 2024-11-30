# Instructions d'installation en production sur Debian

## 1. Prérequis système

```bash
# Mettre à jour le système
sudo apt update && sudo apt upgrade -y

# Installer les dépendances système
sudo apt install -y curl git build-essential
```

## 2. Installation de Node.js

```bash
# Installer Node.js 20.x LTS
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# Vérifier l'installation
node --version
npm --version
```

## 3. Installation de PM2 (Process Manager)

```bash
# Installer PM2 globalement
sudo npm install -y pm2 -g
```

## 4. Configuration du projet

```bash
# Créer le répertoire de l'application
sudo mkdir -p /var/www/qdt
sudo chown -R $USER:$USER /var/www/qdt

# Cloner le projet
cd /var/www/qdt
git clone <votre-repo-git> .

# Installer les dépendances
npm install

# Générer le client Prisma
npx prisma generate

# Créer la base de données et appliquer les migrations
npx prisma migrate deploy
npx prisma db seed
```

## 5. Configuration de l'environnement

```bash
# Créer le fichier .env
cat > .env << EOL
DATABASE_URL="file:./dev.db"
NODE_ENV=production
PORT=3001
EOL
```

## 6. Build de l'application

```bash
# Compiler l'application React
npm run build
```

## 7. Configuration de PM2

```bash
# Créer la configuration PM2
cat > ecosystem.config.js << EOL
module.exports = {
  apps: [
    {
      name: 'qdt-api',
      script: 'tsx',
      args: 'server/index.ts',
      env: {
        NODE_ENV: 'production',
        PORT: 3001
      },
      instances: 'max',
      exec_mode: 'cluster',
      max_memory_restart: '500M'
    }
  ]
}
EOL

# Démarrer l'application avec PM2
pm2 start ecosystem.config.js

# Sauvegarder la configuration PM2
pm2 save

# Configurer le démarrage automatique
pm2 startup
```

## 8. Configuration Nginx

```bash
# Installer Nginx
sudo apt install -y nginx

# Créer la configuration Nginx
sudo cat > /etc/nginx/sites-available/qdt << EOL
server {
    listen 80;
    server_name votre-domaine.com;

    location / {
        root /var/www/qdt/dist;
        try_files \$uri \$uri/ /index.html;
    }

    location /api {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_cache_bypass \$http_upgrade;
    }
}
EOL

# Activer le site
sudo ln -s /etc/nginx/sites-available/qdt /etc/nginx/sites-enabled/
sudo rm /etc/nginx/sites-enabled/default

# Vérifier la configuration Nginx
sudo nginx -t

# Redémarrer Nginx
sudo systemctl restart nginx
```

## 9. Configuration du pare-feu

```bash
# Configurer UFW
sudo apt install -y ufw
sudo ufw allow 'Nginx Full'
sudo ufw allow OpenSSH
sudo ufw enable
```

## 10. SSL avec Certbot (optionnel mais recommandé)

```bash
# Installer Certbot
sudo apt install -y certbot python3-certbot-nginx

# Obtenir un certificat SSL
sudo certbot --nginx -d votre-domaine.com
```

## 11. Maintenance

### Mise à jour de l'application

```bash
# Se placer dans le répertoire du projet
cd /var/www/qdt

# Tirer les dernières modifications
git pull

# Installer les dépendances
npm install

# Mettre à jour la base de données
npx prisma migrate deploy

# Reconstruire l'application
npm run build

# Redémarrer l'application
pm2 restart all
```

### Surveillance des logs

```bash
# Voir les logs en temps réel
pm2 logs

# Voir le statut des applications
pm2 status
```

### Sauvegarde de la base de données

```bash
# Créer un répertoire pour les sauvegardes
mkdir -p /var/backups/qdt

# Créer une sauvegarde
cp /var/www/qdt/prisma/dev.db /var/backups/qdt/dev.db.$(date +%Y%m%d)
```

## Notes importantes

1. Remplacer `votre-domaine.com` par votre nom de domaine réel
2. Configurer des sauvegardes régulières de la base de données
3. Mettre en place une surveillance des ressources système
4. Configurer des alertes en cas de problème
5. Maintenir le système à jour régulièrement