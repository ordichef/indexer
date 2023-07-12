import fs from "fs"
import axios from "axios";

const process = async () => {


  const holders = fs.readFileSync("holder.txt", { encoding: "utf8" }).split("\n");
  const listMeta: any[] = []
  let index = 0;
  for (const holder of holders) {
    const resp  = await axios.get("https://api.hiro.so/ordinals/v1/inscriptions?address="+holder);
    for (const result of resp["data"]["results"]) {
      index++;
      const meta = {
        "id": result.id,
        "meta": {
            "name": `Onchain Bean #${index}`,
            "high_res_img_url": "https://i.imgur.com/0Q3rJgi.gif",
            // "attributes": [
            //     {
            //         "trait_type": "Clan",
            //         "value": "Aoi"
            //     }
            // ]
        }
      }
      listMeta.push(meta);
    }
  }

  fs.writeFileSync("output.txt", JSON.stringify(listMeta, null, 2))

}
process();