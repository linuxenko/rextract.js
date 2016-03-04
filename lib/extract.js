import {Rect} from './region';

export default class Extract {
  extractRegion(x, y, w = 1, h = 1) {
    let rect = new Rect(x, y, w, h),
    offset = {};

    while((offset = this.rectOffset(rect)) !== true) {
        rect.patch(offset);
    }

    return rect.fix(this.canvas.width, this.canvas.height);
  }


  rectOffset(rect) {
    /* top , left -> right */
    if (this.isEmptyX(rect.x, rect.x + rect.w, rect.y) === false) {
      if (rect.y > 0) {
        return {y : -1};
      }
    }

    /* left, top -> bottom */
    if (this.isEmptyY(rect.y, rect.y + rect.h, rect.x) === false) {
      if (rect.x > 0) {
        return {x : -1};
      }
    }

    /* right, top -> bottom */
    if (this.isEmptyY(rect.y, rect.y + rect.h, rect.x + rect.w) === false) {
      if (this.canvas.width > rect.w) {
        return {w : 1};
      }
    }

    /* bottom, left -> right */
    if (this.isEmptyX(rect.x, rect.x + rect.w, rect.y + rect.h) === false) {
      if (this.canvas.height > rect.h) {
        return {h : 1};
      }
    }

    return true;
  }

  isEmptyX(start, stop, pointY) {
    for (let x = start; x < stop; x++) {
      if (this.isEmpty(x, pointY) === false) {
        return false;
      }
    }
    return true;
  }

  isEmptyY(start, stop, pointX) {
    for (let y = start; y < stop; y++) {
      if (this.isEmpty(pointX, y) === false) {
        return false;
      }
    }
    return true;
  }

  isEmpty(x, y) {
    let data = this.ctx.getImageData(x, y, 1, 1).data;

    if (this.color.t < 255) {
      return data[3] <= this.color.t;
    }

    return (
        data[0] === this.color.r &&
        data[1] === this.color.g &&
        data[2] === this.color.b
        //data[3] === this.color.t
      );
  }
}
