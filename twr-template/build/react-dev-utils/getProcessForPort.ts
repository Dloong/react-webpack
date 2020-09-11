import chalk from 'chalk';
import {execSync} from 'child_process';

const execOptions = {
  encoding: 'utf8',
  stdio: [
    'pipe', // stdin (default)
    'pipe', // stdout (default)
    'ignore', // stderr
  ],
};

function isProcessAReactApp(processCommand) {
  return /^node .*react-(?:scripts\/){2}start\.js\s?$/.test(processCommand);
}

function getProcessIdOnPort(port) {
  return execSync(`lsof -i:${  port  } -P -t -sTCP:LISTEN`, execOptions as any)
    .split('\n')[0]
    .trim();
}


function getProcessCommand(processId) {
  let command = execSync(
    `ps -o command -p ${  processId  } | sed -n 2p`,
    execOptions as any
  );

  command = command.replace(/\n$/, '');

  if (isProcessAReactApp(command)) {
    return  command;
  }
    return command;

}

function getDirectoryOfProcessById(processId) {
  return execSync(
    `lsof -p ${
      processId
      } | awk '$4=="cwd" {for (i=9; i<=NF; i++) printf "%s ", $i}'`,
    execOptions as any
  ).trim();
}

function getProcessForPort(port: number): any {
  try {
    const processId = getProcessIdOnPort(port);
    const directory = getDirectoryOfProcessById(processId);
    const command = getProcessCommand(processId);
    return (
      chalk.cyan(command) +
      chalk.grey(` (pid ${  processId  })\n`) +
      chalk.blue('  in ') +
      chalk.cyan(directory)
    );
  } catch  {
    return null;
  }
}

export default getProcessForPort;
