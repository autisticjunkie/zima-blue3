export const commands = {
  help: 'Shows available commands',
  clear: 'Clears the terminal',
  exit: 'Exits the terminal',
  consult: 'Start chatting with ZIMA AI',
  contract: 'Show the ZIMA token contract address',
}

export type Command = keyof typeof commands

