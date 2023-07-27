import fs from "fs"
import axios from "axios";

const process = async () => {


  const nfts = JSON.parse(fs.readFileSync("ids.txt", { encoding: "utf8" }));
  const listMeta: any[] = []
  let index = 0;
  for (const nft of nfts) {
    // nft.meta.high_res_img_url = `https://onchainbean.s3.ap-southeast-1.amazonaws.com/${nft.meta.name.split("#")[1]}.png`
    // nft.meta.attributes = [];
    // fs.appendFileSync("output3.txt", `- ${nft.meta.name}\n`)
    // const resp = await axios.get("https://api.hiro.so/ordinals/v1/inscriptions/"+nft.id);
    // fs.appendFileSync("output3.txt", `- Inscription #${resp.data.number}\n`)
    // fs.appendFileSync("output3.txt", `- Ordinal ID: ${nft.id}\n`)
    // fs.appendFileSync("output3.txt", `\n`)
    
    listMeta.push(nft.id);
    
  }
  fs.appendFileSync("output3.txt", JSON.stringify(listMeta))
    

}
process();