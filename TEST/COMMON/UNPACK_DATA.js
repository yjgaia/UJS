var
// data
data,

// packed data
packedData,

// unpacked data
unpackedData;

data = {
	now : new Date(),
	o : {
		d : new Date()
	}
};

packedData = PACK_DATA(data);

unpackedData = UNPACK_DATA(packedData);

console.log(data);
console.log(packedData);
console.log(unpackedData);

console.log(CHECK_ARE_SAME([data, unpackedData]));
