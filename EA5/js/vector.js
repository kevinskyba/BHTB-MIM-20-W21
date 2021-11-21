
class Vector3D {
    constructor(x = 0, y = 0, z = 0) {
        this._x = x;
        this._y = y;
        this._z = z;
    }

    get x() { return this._x; }
    get y() { return this._y; }
    get z() { return this._z; }

    set x(v) { this._x = v; }
    set y(v) { this._y = v; }
    set z(v) { this._z = v; }
}