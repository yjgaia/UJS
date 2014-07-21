var
// data
data = {
	now : new Date(),
	o : {
		d : new Date()
	}
},

// packed data
packedData = PACK_DATA(data);

console.log(data);
console.log(packedData);
