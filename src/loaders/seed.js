import BlogPost from '../models/BlogPost';

const seedData = [
  {
    authorName: 'Dew Yuill',
    title: 'Displacement of surgically created arteriovenous shunt, subsequent encounter',
    body: 'Burn of first degree of ear [any part, except ear drum]',
  },
  {
    authorName: 'Maure Lethley',
    title: 'Unspecified open wound of right ring finger with damage to nail',
    body: 'Diabetes mellitus due to underlying condition with ophthalmic complications',
  },
  {
    authorName: 'Daphna Cardozo',
    title:
      'Nondisplaced comminuted fracture of shaft of radius, left arm, subsequent encounter for open fracture type I or II with routine healing',
    body: 'Salter-Harris Type I physeal fracture of lower end of left femur, subsequent encounter for fracture with routine healing',
  },
  {
    authorName: 'Ancell Mole',
    title:
      "Nondisplaced Maisonneuve's fracture of right leg, subsequent encounter for open fracture type I or II with routine healing",
    body: 'Encounter for hearing conservation and treatment',
  },
  {
    authorName: 'Carita Lamberti',
    title:
      'Nondisplaced oblique fracture of shaft of left ulna, initial encounter for open fracture type I or II',
    body: 'Asphyxiation due to mechanical threat to breathing due to other causes, accidental',
  },
  {
    authorName: 'Ulrikaumeko Kleinhausen',
    title:
      'Unspecified injury of axillary or brachial vein, unspecified side, subsequent encounter',
    body: 'Puncture wound without foreign body of left front wall of thorax without penetration into thoracic cavity, sequela',
  },
  {
    authorName: 'Melania Chason',
    title:
      'Displaced midcervical fracture of left femur, subsequent encounter for closed fracture with routine healing',
    body: 'Pathological fracture in other disease, unspecified ulna and radius, subsequent encounter for fracture with malunion',
  },
];


export default async function seedDatabase() {
  const postsCount = await BlogPost.countDocuments();
  if (postsCount <= 1){
    await BlogPost.insertMany(seedData);
    console.log("Database Seed Complete!")
  }
}

