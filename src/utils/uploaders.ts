import { baseUploader, IValidator } from "./baseUploader";

// 上传文件的适配器
function myUploaderAdapter(){ /** code */};
// 用于上传头像
export const avatarUploader = baseUploader.bind(null, myUploaderAdapter, <IValidator[]>[
  {
    async validator (file: File): Promise<boolean> {
      const url = window.URL.createObjectURL(file);
      const oImg = new Image();

      return new Promise((resolve, reject) => {
        oImg.onload = (): void => {
          const { width, height } = oImg;
          console.log(width, height);

          width >= 3000 || height >= 3000 ? resolve(false) : resolve(true);
        }
      
        oImg.onerror = (): void => { reject("load img error");}
      
        oImg.src = url;
      })
    },
    errMsg: "图片的尺寸必须是300x300之内"
  }
]);
// 用于上传商品图片
export const goodsImgUploader = baseUploader.bind(null, myUploaderAdapter, <IValidator[]>[
  {
    validator (file: File): boolean {
      const name = file.name;
      const ext = name.slice(name.lastIndexOf('.') + 1).toLowerCase();
      console.log(ext);
      return ['png', 'jpg'].includes(ext);
    },
    errMsg: "上传图片的类型只能为['png', 'jpg']"
  },
  {
    validator (file: File): boolean {
     const size = file.size;

     return size <= 1000 * 10;
    },
    errMsg: "上传图片的最大大小为10k"
  }
]);