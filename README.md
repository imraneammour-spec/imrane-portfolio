# Imrane Ammour — Portfolio

Portfolio statique en français : architecture intérieure et visualisation 3D.
L'accueil et les onze pages de projets partagent un thème sombre, des touches
dorées et des animations respectant la préférence de mouvement réduit.
Le hero joue la visite de la villa en boucle et sans son, avec un titre qui
apparaît ligne par ligne. Le bouton Pause/Lecture permet de contrôler la vidéo.
Elle se suspend hors écran ou dans un onglet masqué ; la photo reste le
remplacement en cas d'erreur, de mouvement réduit ou d'économie de données.
`assets/villa-contemporaine/hero-loop.mp4` est la version légère du hero (H.264,
1440 px de large, 24 images/s, sans piste audio, environ 2 Mo). La visite
originale reste utilisée dans la section Visites immersives.

## Aperçu local

Depuis le dossier du projet, lancer `python -m http.server 8000 --bind 127.0.0.1`,
puis ouvrir <http://127.0.0.1:8000>. Aucun build ni installation npm nécessaire.
Arrêter le serveur avec Ctrl+C.

## Structure

- `index.html` : accueil, filtres de projets, présentation, services, vidéo et contact.
- Les onze autres pages HTML : études de projets, carrousels, miniatures et galerie plein écran.
- `redesign.css` : direction visuelle et adaptations téléphone/tablette/ordinateur.
- `carousel.css` : mise en page des carrousels des pages de projets.
- `script.js` : menus, filtres, animations, galleries et contact.
- `assets/` : visuels d'origine et aperçus WebP optimisés.

Les carrousels se parcourent avec leurs flèches, leurs miniatures, les touches
gauche/droite ou un glissement tactile. Cliquer une image ouvre la galerie ;
Échap la ferme et rend le focus à l'image d'origine.

## Contact

Le formulaire conserve l'endpoint Formspree existant :
`https://formspree.io/f/xljrajoz`. Il valide les champs obligatoires, affiche
le résultat et réactive l'envoi après un échec ou un délai de 15 secondes.
La réception réelle des emails dépend de la configuration du compte Formspree.
Les liens WhatsApp, téléphone et email offrent des accès directs.

## Vérification et images

`python -m unittest discover -s tests` vérifie les contenus et images de projets.
`powershell -File tests/final-polish.tests.ps1` vérifie les icônes et règles mobiles.
`node --check script.js` vérifie la syntaxe JavaScript.
`node --test tests/contact-form.test.cjs` vérifie l'envoi, les erreurs et le timeout
avec un serveur simulé, sans envoyer de message réel.
`node --test tests/hero-video.test.cjs` vérifie le contrôle vidéo, les préférences
de mouvement, l'économie de données et les erreurs de lecture.

Pour régénérer les aperçus après remplacement des images sources :
`python tools/optimize-preview-images.py` (Pillow nécessaire).
Les images originales des galleries sont conservées intégralement.

## Publication

Le dossier peut être servi directement par un hébergeur statique. Les URL
canoniques et les métadonnées de partage conservent le domaine Netlify existant.
