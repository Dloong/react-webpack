/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable consistent-return */
/* eslint-disable promise/catch-or-return */
/* eslint-disable promise/always-return */
/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



import address from  'address';
import url from  'url';
import chalk from  'chalk';
import detect from  'detect-port-alt';
import isRoot from  'is-root';
import inquirer from  'inquirer';
import clearConsole from  './clearConsole';
import getProcessForPort from "./getProcessForPort"

const isInteractive = process.stdout.isTTY;
export interface IprepareUrl {
  lanUrlForConfig: string,
  lanUrlForTerminal: string,
  localUrlForTerminal: string,
  localUrlForBrowser: string
}
// http(s), ip, 端口 ，路径
export function prepareUrls(protocol: string, host: string, port: any, pathname = '/'): IprepareUrl {
  const formatUrl = hostname =>
    url.format({
      protocol,
      hostname,
      port,
      pathname,
    });
  const prettyPrintUrl = hostname =>
    url.format({
      protocol,
      hostname,
      port: chalk.bold(port),
      pathname,
    });

  const isUnspecifiedHost = host === '0.0.0.0' || host === '::';
  let prettyHost; let lanUrlForConfig; let lanUrlForTerminal;
  if (isUnspecifiedHost) {
    prettyHost = 'localhost';
    try {
      // This can only return an IPv4 address
      lanUrlForConfig = address.ip();
      if (lanUrlForConfig) {
        // Check if the address is a private ip
        // https://en.wikipedia.org/wiki/Private_network#Private_IPv4_address_spaces
        if (
          /^10\.|^172\.(1[6-9]|2\d|3[01])\.|^192\.168\./.test(
            lanUrlForConfig
          )
        ) {
          // Address is private, format it for later use
          lanUrlForTerminal = prettyPrintUrl(lanUrlForConfig);
        } else {
          // Address is not private, so we will discard it
          lanUrlForConfig = undefined;
        }
      }
    } catch  {
      // ignored
    }
  } else {
    prettyHost = host;
  }
  const localUrlForTerminal = prettyPrintUrl(prettyHost);
  const localUrlForBrowser = formatUrl(prettyHost);
  return {
    lanUrlForConfig,
    lanUrlForTerminal,
    localUrlForTerminal,
    localUrlForBrowser,
  };
}

// 这里会返回一个port，具体原理是利用detect做端口检测，如果被占用了就返回一个最接近的递增方向的可用端口
// 如果发现返回的可用端口不是默认的端口，给出一个交互式的命令询问是否要切换端口访问（inquirer）

export function choosePort(host: string, defaultPort: number): any {
  return detect(defaultPort, host).then(
    port =>
      new Promise(resolve => {
        if (port === defaultPort) {
          return resolve(port);
        }
        const message =
          process.platform !== 'win32' && defaultPort < 1024 && !isRoot()
            ? `Admin permissions are required to run a server on a port below 1024.`
            : `Something is already running on port ${defaultPort}.`;
        if (isInteractive) {
          clearConsole();
          const existingProcess = getProcessForPort(defaultPort);
          const question = {
            type: 'confirm',
            name: 'shouldChangePort',
            message:
              `${chalk.yellow(
                `${message
                  }${existingProcess ? ` Probably:\n  ${existingProcess}` : ''}`
              )  }\n\nWould you like to run the app on another port instead?`,
            default: true,
          };
          // eslint-disable-next-line promise/no-nesting
          inquirer.prompt(question)
          .then(answer => {
            if (answer.shouldChangePort) {
              resolve(port);
            } else {
              resolve(null);
            }
          })

        } else {
          console.log(chalk.red(message));
          resolve(null);
        }
      }),
    error => {
      throw new Error(
        `${chalk.red(`Could not find an open port at ${chalk.bold(host)}.`)
          }\n${
          `Network error message: ${  error.message}` || error
          }\n`
      );
    }
  );
}

