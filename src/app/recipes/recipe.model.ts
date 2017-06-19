import {Ingridient} from "../shared/ingrid.model";

export class Recipe {
  public name: string;
  public desc: string;
  public imgPath: string;
  public ingrids: Ingridient[];

  constructor(name: string, desc: string, imgPath: string, ingrids: Ingridient[]) {
    this.name = name;
    this.desc = desc;
    this.imgPath = imgPath;
    this.ingrids = ingrids;
  }
}
