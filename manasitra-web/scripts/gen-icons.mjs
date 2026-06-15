import sharp from 'sharp'
import { readFileSync, mkdirSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const svgPath = join(__dirname, '../public/favicon.svg')
const svgBuffer = readFileSync(svgPath)

// Android mipmap icon sizes
const androidIcons = [
  { dir: 'mipmap-mdpi',    size: 48  },
  { dir: 'mipmap-hdpi',    size: 72  },
  { dir: 'mipmap-xhdpi',   size: 96  },
  { dir: 'mipmap-xxhdpi',  size: 144 },
  { dir: 'mipmap-xxxhdpi', size: 192 },
]

const androidBase = join(__dirname, '../android/app/src/main/res')

for (const { dir, size } of androidIcons) {
  const outDir = join(androidBase, dir)
  mkdirSync(outDir, { recursive: true })

  // ic_launcher.png — white background
  await sharp(svgBuffer)
    .resize(size, size)
    .flatten({ background: '#ffffff' })
    .png()
    .toFile(join(outDir, 'ic_launcher.png'))

  // ic_launcher_round.png — white background circle
  await sharp(svgBuffer)
    .resize(size, size)
    .flatten({ background: '#F5F1E8' })
    .png()
    .toFile(join(outDir, 'ic_launcher_round.png'))

  // ic_launcher_foreground.png — transparent bg for adaptive icon
  await sharp(svgBuffer)
    .resize(Math.round(size * 0.75), Math.round(size * 0.75))
    .extend({
      top: Math.round(size * 0.125),
      bottom: Math.round(size * 0.125),
      left: Math.round(size * 0.125),
      right: Math.round(size * 0.125),
      background: { r: 0, g: 0, b: 0, alpha: 0 }
    })
    .png()
    .toFile(join(outDir, 'ic_launcher_foreground.png'))

  console.log(`✓ ${dir} (${size}px)`)
}

// Also generate for public folder (PWA)
const publicBase = join(__dirname, '../public')
await sharp(svgBuffer).resize(192, 192).flatten({ background: '#ffffff' }).png().toFile(join(publicBase, 'icon-192.png'))
await sharp(svgBuffer).resize(512, 512).flatten({ background: '#ffffff' }).png().toFile(join(publicBase, 'icon-512.png'))
console.log('✓ PWA icons (192, 512)')
console.log('\nAll icons generated!')
