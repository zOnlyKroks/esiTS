const documentation = require('documentation')
const fs = require('fs')
const path = require('path')
const Chalk = require('chalk')

async function build() {
    let files = fs.readdirSync(path.join(__dirname, '../src'))
    for (let file of files) {
        if (file !== `util` && file.endsWith('.ts') && file !== 'types') {
            console.log(Chalk.yellow(`Building docs for ${file}...`))
            let doc = await documentation.build([`${path.join(__dirname, `../src/${file}`)}`], {
                extension: 'ts',
                // gotta remove the util cause those somehow end up in every fucking md
                inferPrivate: '^get|set|sleep|log',
            })
            doc = await documentation.formats.md(doc, {
                markdownToc: true,
            })

            fs.writeFileSync(`./docs/${file.replace('.ts', '.md')}`, doc)
            console.log(Chalk.green(`Docs for ${file} built.`))
        }
    }
    // now rebuild the util, except this time dont ignore the util functions
    let file = `utility.ts`
    console.log(Chalk.yellow(`Building docs for ${file}...`))
    let doc = await documentation.build([`${path.join(__dirname, `../src/${file}`)}`], {
        extension: 'ts',
    })
    doc = await documentation.formats.md(doc, {
        markdownToc: true,
    })

    fs.writeFileSync(`./docs/${file.replace('.ts', '')}.md`, doc)
    console.log(Chalk.green(`Docs for ${file} built.`))
}
build().catch((e) => {
    console.error(e.stack)
})
