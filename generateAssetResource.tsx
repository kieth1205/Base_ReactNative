console.log('Generating...');
var fs = require('fs');
var Hjson = require('hjson');

const genStringResource = () => {
  try {
    const data = fs.readFileSync('./src/i18n/locales/vi.tsx', 'utf8');
    const json = Hjson.parse(
      data.replace('export default', '').replace(';', ''),
    );
    const stringName = Object.keys(json);
    fs.writeFileSync(
      './src/assets/strings.js',
      `import i18 from '@i18';
        const strings = {
            ${stringName.map(string => {
              const path = `
        ${string}: i18.t("${string}")`;
              return path;
            })}
        }
 
        export default strings
        `,
    );
    console.log(
      `============== Linked ${stringName.length} string ==============`,
    );
  } catch (err) {
    console.error(err);
  }
};

function genImageResource() {
  fs.readdir('./src/assets/images/', function (err, fileName) {
    if (err) {
      console.log(err);
      return;
    }
    fs.writeFileSync(
      './app/assets/imagesAsset.js',
      `const images = {
    ${fileName.map(iconName => {
      const path = `
    ${iconName.replace('.png', '')}: require("./images/${iconName}")`;
      return path;
    })}
    }
export default images`,
      {encoding: 'utf8', flag: 'w'},
    );
    console.log(
      `============== Linked ${fileName.length} images ==============`,
    );
  });
}

genImageResource();
genStringResource();
