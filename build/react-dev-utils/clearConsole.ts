
 function clearConsole():void {
  process.stdout.write(
    process.platform === 'win32' ? '\u001B[2J\u001B[0f' : '\u001B[2J\u001B[3J\u001B[H'
  );
}
export default clearConsole