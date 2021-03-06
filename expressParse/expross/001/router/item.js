function Item (path, fn) {
	this.handle = fn;
	this.name = fn.name || '<anonymous>';
	this.path = path;
}

//简单处理
Item.prototype.handle_request = function(req, res) {
	var fn = this.handle;
	if (fn) {
		fn (req, res);
	}
}

//简单匹配

Item.prototype.match = function(path) {
	if (path === this.path) {
		return true;
	}
	return false;
}

module.exports  = Item;
