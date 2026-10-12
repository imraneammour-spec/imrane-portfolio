"""Import the authentic renders from the preserved original project pages."""
from pathlib import Path
from html import unescape
import json, re
from PIL import Image

root = Path(__file__).resolve().parents[1]
entries = [
 ('cafe-khemisset','Café Khémisset','Interior Design','Hospitality','Khémisset, Morocco','A warm hospitality space where Moroccan craftsmanship meets a contemporary interior.','Zellige, carved wood and traditional lanterns create a welcoming atmosphere, with a rich material palette and considered lighting.','cafe-thumbnail'),
 ('villa-contemporaine','Villa contemporaine','Architecture','Residential architecture',None,'A personal study of contemporary residential architecture, exploring volumes, daylight and a generous relationship with the garden.','Clear architectural lines, mineral materials and planting frame a home that opens to its surroundings. Light and shadow give the facade its rhythm.','villa-thumbnail'),
 ('parapharmacie-sale','Parapharmacie Salé','Interior Design','Retail','Salé, Morocco','A bright contemporary retail space, designed for a clear, comfortable and reassuring shopping experience.','Clean lines, glass, wood and restrained metallic details give the product displays clarity and the interior a composed identity.','parapharmacie-thumbnail'),
 ('villa','Villa','Interior Design','Residential interior',None,'A luminous residential interior combining contemporary lines, wood, stone and soft lighting.','Open spaces, natural tones and carefully placed lighting form an interior organised around comfort and light.','villa-interior-thumbnail'),
 ('appartement','Appartement','Interior Design','Residential interior',None,'Four spaces from the same apartment: the hall, the parents’ bedroom, the daughter’s bedroom and the terrace.','A sequence of connected residential spaces, presented through visualizations that explore each room’s layout and atmosphere.','appartement-thumbnail'),
 ('cafe-brunch','Café Brunch','Interior Design','Hospitality',None,'A brunch café in soft colours, with dining spaces arranged across a ground floor and first floor.','A coherent interior across two levels, balancing the experience of shared dining with the character of each individual space.','cafe-brunch-thumbnail'),
 ('cabinet-dr-hamane','Cabinet Dr Hamane','Interior Design','Healthcare',None,'A psychiatry practice with bright spaces, a clear reception area and calm consultation rooms.','An interior focused on welcome and calm, from the reception space to the private consultation areas.','cabinet-thumbnail'),
 ('dr-hafidi-opera','Dr Hafidi Opera','Interior Design','Healthcare',None,'An interior project presented through two waiting areas and a model of the complete layout.','The waiting spaces and overall model show how individual rooms relate within a complete interior proposal.','dr-hafidi-thumbnail'),
 ('dr-samir-opera','Dr Samir Opera','Interior Design','Healthcare',None,'A bright practice interior, from the office and waiting area to the treatment spaces.','A connected sequence of reception, work and care spaces, explored through architectural visualization.','dr-samir-thumbnail'),
 ('appartement-ayoub','Appartement Ayoub','Interior Design','Residential interior',None,'A contemporary apartment with an open kitchen, living area, bedroom and versatile space.','The visual study connects shared living spaces with more private rooms, giving each area its own atmosphere within a coherent interior.','ayoub-thumbnail'),
 ('appartement-said-opera','Appartement Said Opera','Interior Design','Residential interior',None,'A contemporary living space where the lounge and dining area form a connected whole.','The living and dining zones respond to each other through a shared composition, with attention to light, furnishings and spatial flow.','said-thumbnail'),
]
projects = []
for i, (slug,title,category,kind,location,overview,concept,thumb) in enumerate(entries):
 html = (root / (slug+'.html')).read_text(encoding='utf-8')
 images = []
 for attrs in re.findall(r'<figure\b[^>]*data-gallery-image[^>]*>\s*<img\b([^>]+)',html):
  src = re.search(r'src="([^"]+)"',attrs)[1]
  alt = unescape(re.search(r'alt="([^"]*)"',attrs)[1])
  with Image.open(root / src) as image: width,height=image.size
  images.append(dict(src='/'+src,alt=alt,width=width,height=height))
 with Image.open(root / ('assets/thumbnails/'+thumb+'.webp')) as image: pw,ph=image.size
 original_thumbnail = re.search(r'\.'+thumb+r'\s*\{[^}]*url\(\x27([^\x27]+)', (root/'cafe.css').read_text(encoding='utf-8'))
 preview_alt = next((image['alt'] for image in images if original_thumbnail and image['src']=='/'+original_thumbnail[1]),images[0]['alt'])
 project = dict(slug=slug,title=title,category=category,kind=kind,number=f'{i+1:02}',overview=overview,concept=concept,cover=images[0],preview=dict(src='/assets/thumbnails/'+thumb+'.webp',alt=preview_alt,width=pw,height=ph),gallery=images,services=['Interior architecture','3D visualization'] if category=='Interior Design' else ['3D visualization','Architectural study'])
 if location: project['location']=location
 if slug=='villa-contemporaine': project['status']='Personal study · Concept'
 projects.append(project)
types = '''export type ProjectImage = { src: string; alt: string; width: number; height: number };
export type Project = {
 slug: string; title: string; category: 'Interior Design' | 'Architecture' | '3D Visualization' | 'Technical Drawings'; kind: string; number: string;
 overview: string; concept: string; cover: ProjectImage; preview: ProjectImage; gallery: ProjectImage[];
 services: string[]; location?: string; year?: number; status?: string;
 technicalDrawings?: ProjectImage[]; materialBoard?: ProjectImage[];
 beforeAfter?: { before: ProjectImage; after: ProjectImage };
};
'''
dest=root/'src/data/projects.ts'; dest.parent.mkdir(parents=True,exist_ok=True)
dest.write_text(types+'\nexport const projects: Project[] = '+json.dumps(projects,ensure_ascii=False,indent=2)+';\n\nexport const getProject = (slug: string) => projects.find(project => project.slug === slug);\n',encoding='utf-8')
print(f'Imported {len(projects)} authentic projects and {sum(len(p["gallery"]) for p in projects)} renders.')
