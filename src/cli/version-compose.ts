import fs from 'fs'
import path from 'path'

let compose = fs.readFileSync(path.join(__dirname, '..', '..', 'docker-compose.yaml'), { encoding: 'utf-8' })
compose = compose.replaceAll(/adamd3\/PathoGeneLit:[\d\.]+/g, `adamd3/PathoGeneLit:${process.env.npm_package_version}`)
fs.writeFileSync(path.join(__dirname, '..', '..', 'docker-compose.yaml'), compose)