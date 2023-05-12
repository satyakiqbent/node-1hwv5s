// run `node index.js` in the terminal
console.log(`Hello Node.js v${process.versions.node}!`);
if(req.files){
  const files: any = Object.assign({}, req.files);
  if(files.hasOwnProperty("logo")){
    let logoPath: any = "./uploads/airports/logos/";
    // remove existing logo
    if(airport.hasOwnProperty("logo")){
      fs.unlink(logoPath + airport.logo , (err) =>{
        if(err){
          console.log(err);
        }
      });
    // upload new logo
    let logo: any = files.logo;
    let logoArr: any[] = (logo.name || "").split(".");
    let logoExtension = logoArr[logoArr.length -1];
    let logoFileName: string = `${new ObjectId().toString()}.${logoExtension}`;
    
    updateData.logo = logoFileName;

    logo.mv(logoPath + logoFileName, function(err: any){if(err){console.log("Upload Error",err)}}
    )
 
   }
  }
  if(files.hasOwnProperty("banners")){
    let existingBanners: any[] = Array.isArray(airport.banners)
                                ?airport.banners
                                :[];
    // upload new banner
    const attachedBanners: any[] = Array.isArray(files.banners)
                                  ? (req.files.banners as [])
                                  : [req.files.banners]
    for(let i = 0; i < attachedBanners.length; i++){
      let bannerFile: any = attachedBanners[i];
      let arr: any[] = (bannerFile.name || "").split(".");
      let bannerExtension: string = arr[arr.length -1]; 
      let bannerFileName: string = `${newObjectId().toString()}.${bannerExtension}`;

      existingBanners.push(bannerFileName);
      let bannerUploadPath = "./uploads/airports/banners/" + bannerFileName;
      bannerFile.mv(bannerUploadPath, function(err: any){
        if(err){
          console.log(err);
        }
      })
    }
    updateData.baners = existingBanners; 
   }
}