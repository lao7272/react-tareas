import {normalize, denormalize} from 'normalizr';
import util from 'util'

export function print (normalizedObj, denormalizedObj) {
    const compressedArray =  util.inspect(normalizedObj, false, 12, true).length;
    const decompressedArray = util.inspect(denormalizedObj, false, 12, true).length;
    return {
        compressed: compressedArray,
        decompressed: decompressedArray
    }
    
}

export const normalizeDb = (array, schema) => {
    const newDb = {id:'messages', messages:[...array]};
    const normalizeDb = normalize(newDb, schema);
    return  normalizeDb

} 
export const denormalizeDb = (normalizedArray, schema) => {
    const denormalizeDb = denormalize(normalizedArray.result, schema, normalizedArray.entities);
    return denormalizeDb
} 
