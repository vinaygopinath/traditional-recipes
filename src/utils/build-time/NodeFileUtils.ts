import fs from "fs"
import path from "path"

export class NodeFileUtils {

  // Reference: https://stackoverflow.com/a/28289589
  // CC-BY-SA 3.0
  public static getAllFilesInFolder(currentDir: string): string[] {
    let filesAndFolders: string[] = []
    try {
      filesAndFolders = fs.readdirSync(currentDir)
    } catch (e: any) {
      console.error(e)
      throw Error(`Failed to read the directory ${currentDir}`)
    }

    return filesAndFolders.map(fileOrFolder => {
      const filePath = path.join(currentDir, fileOrFolder);
      console.log(`File path = ${filePath}`)
      const stat = fs.statSync(filePath)
      if (stat.isFile()) {
        return filePath
      } else {
        return this.getAllFilesInFolder(filePath)
      }
    }).flat(10)
  }

  public static doesFileExist(currentDir: string, relativeFilePath: string): boolean {
    const filePath = path.join(currentDir, relativeFilePath);
    return fs.existsSync(filePath) && fs.statSync(filePath).isFile()
  }

  public static getJSONFromFile(filePath: string): any {
    let fileContents: string | null = null
    try {
      fileContents = fs.readFileSync(filePath, 'utf8')
    } catch (e: any) {
      console.error(e)
      throw Error(`Failed to read contents of file ${filePath}`)
    }

    let jsonData: any | null = null
    try {
      jsonData = JSON.parse(fileContents)
    } catch (e: any) {
      console.error(e)
      console.error(`File contents\n`, JSON.stringify(fileContents, null, 2))
      throw Error(`Failed to parse the contents of file ${filePath}`)
    }

    return jsonData
  }
}