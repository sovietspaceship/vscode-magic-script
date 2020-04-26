const package = require('./package.json');

const nScripts = +process.argv[2];

package.contributes.commands = [];
package.activationEvents = [];

for (let i = 1; i <= nScripts; i++) {
    package.contributes.commands.push({
        command: `magic-script.runMagicScript${i}`,
        title: `Run Magic Script ${i}`
    });
    package.activationEvents.push(`onCommand:magic-script.runMagicScript${i}`);
}

require('fs').writeFileSync('./package.json', JSON.stringify(package, null, 4));
