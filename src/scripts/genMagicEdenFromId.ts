import fs from "fs"
import axios from "axios";

const process = async () => {


  const nfts = JSON.parse(fs.readFileSync("ids.txt", { encoding: "utf8" }));
  const listMeta: any[] = []
  let index = 0;
  for (const nft of nfts) {
    nft.meta.high_res_img_url = `https://onchainbean.s3.ap-southeast-1.amazonaws.com/${nft.meta.name.split("#")[1]}.png`
    nft.meta.attributes = [];
  }

  fs.writeFileSync("output.txt", JSON.stringify(nfts, null, 2))

}
process();