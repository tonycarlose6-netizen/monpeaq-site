# Site public MonPEAQ

Site vitrine statique en français, responsive, sans framework ni dépendances payantes. Prévu pour Cloudflare Pages Free. Les fichiers déployés sont dans `site/`.

## Aperçu local

Vous pouvez ouvrir `site/index.html` directement dans le navigateur. Pour tester comme un site web, lancez un serveur local dans `site/`, par exemple avec Python :

```bash
cd site
python -m http.server 8000
```

Puis ouvrez `http://localhost:8000`.

## Avant publication : configurer le téléchargement APK

Le bouton est volontairement inactif tant qu'une URL officielle n'est pas ajoutée. Ne publiez pas de lien inventé.

1. Créez un dépôt GitHub public, par exemple `monpeaq-android`.
2. Créez une GitHub Release et joignez l'APK Android Release, renommé `monpeaq.apk`. L'APK de 75,1 Mo doit être hébergé en Release et non comme fichier de Cloudflare Pages : la limite d'un asset Pages est de 25 MiB, alors que GitHub Releases accepte un fichier individuel jusqu'à 2 GiB.
3. Copiez l'URL de téléchargement direct. Le format sera généralement `https://github.com/COMPTE/DEPOT/releases/latest/download/monpeaq.apk`.
4. Ouvrez `site/site-config.js` et remplacez `apkDownloadUrl: ""` par cette URL entre guillemets.
5. Si une adresse publique de contact existe, renseignez `contactEmail`. Elle n'est affichée nulle part tant qu'elle n'est pas configurée.

## Déployer gratuitement avec Cloudflare Pages + GitHub

Cette solution sépare le site (Cloudflare Pages) et le fichier APK (GitHub Releases).

1. Créez un dépôt GitHub pour le site, par exemple `monpeaq-site`.
2. Copiez les contenus de ce dossier dans le dépôt, puis poussez-les sur la branche `main`.
3. Dans Cloudflare, ouvrez **Workers & Pages → Create → Pages → Import an existing Git repository** et choisissez le dépôt du site.
4. Configurez :
   - Production branch : `main`
   - Build command : `exit 0`
   - Build output directory : `site`
5. Lancez le déploiement. Cloudflare fournit une adresse sous `*.pages.dev` et peut redéployer automatiquement à chaque poussée sur GitHub.
6. Testez sur téléphone : menu, liens de section, FAQ et téléchargement APK.

Pour mettre les fichiers sur GitHub depuis Windows, ouvrez le terminal dans le dossier du dépôt :

```bash
git init
git add .
git commit -m "Création du site public MonPEAQ"
git branch -M main
git remote add origin https://github.com/VOTRE_COMPTE/monpeaq-site.git
git push -u origin main
```

Remplacez `VOTRE_COMPTE` par votre nom GitHub. N'exécutez ces commandes qu'après avoir créé le dépôt sur GitHub.

## Architecture

- `site/index.html` : contenu et sections du site.
- `site/styles.css` : identité visuelle responsive, animations légères et préférences de réduction du mouvement.
- `site/script.js` : navigation mobile et activation sécurisée du lien de téléchargement.
- `site/site-config.js` : URL APK et adresse de contact configurables.
- `site/assets/` : logo MonPEAQ et favicon.
- `site/_headers` : en-têtes de sécurité simples pour Cloudflare Pages.

## Points à finaliser avant annonce publique

- Renseigner l'URL réelle de GitHub Release dans `site/site-config.js`.
- Ajouter les coordonnées de contact officielles, si disponibles.
- Vérifier que le fichier APK publié est celui que vous souhaitez distribuer, et que le nom de fichier de la Release est `monpeaq.apk`.
- Ajouter une politique de confidentialité officielle si vous décidez de collecter des données via le site. Cette version vitrine ne contient ni formulaire de collecte ni outil d'analyse.
