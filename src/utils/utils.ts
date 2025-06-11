export function isPlainObject(value: unknown): value is PlainObject {
    return typeof value === 'object'
        && value !== null
        && value.constructor === Object
        && Object.prototype.toString.call(value) === '[object Object]';
}

export function isArray(value: unknown): value is [] {
    return Array.isArray(value);
}

export function isArrayOrObject(value: unknown): value is [] | PlainObject {
    return isPlainObject(value) || isArray(value);
}

export function isEqual(lhs: PlainObject, rhs: PlainObject) {
    if (Object.keys(lhs).length !== Object.keys(rhs).length) {
        return false;
    }

    for (const [key, value] of Object.entries(lhs)) {
        const rightValue = rhs[key];
        if (isArrayOrObject(value) && isArrayOrObject(rightValue)) {
            if (isEqual(value, rightValue)) {
                continue;
            }
            return false;
        }

        if (value !== rightValue) {
            return false;
        }
    }

    return true;
}

export function render(query, block) {
  const root = document.querySelector(query);
  root.textContent = block.getContent();
  return root;
}

export function merge(lhs: Indexed, rhs: Indexed): Indexed {
    for (let p in rhs) {
        if (!rhs.hasOwnProperty(p)) {
            continue;
        }

        try {
            if (rhs[p].constructor === Object) {
                rhs[p] = merge(lhs[p] as Indexed, rhs[p] as Indexed);
            } else {
                lhs[p] = rhs[p];
            }
        } catch(e) {
            lhs[p] = rhs[p];
        }
    }

    return lhs;
}

export function set(object: Indexed | unknown, path: string, value: unknown): Indexed | unknown {
    if (typeof object !== 'object' || object === null) {
        return object;
    }

    if (typeof path !== 'string') {
        throw new Error('path must be string');
    }

    const result = path.split('.').reduceRight<Indexed>((acc, key) => ({
        [key]: acc,
    }), value as any);
    return merge(object as Indexed, result);
}

export function trim(str: string, symbols: string = ' ') :string {
    const disallowSymbolsArr = symbols.split('');
    let startAcceptSymbolsIndex;
    let endAcceptSymbolsIndex;
    
    for(let i = 0; i < str.length; i++) {
        const isAcceptedSymbol = !disallowSymbolsArr.includes(str[i]);

        if(isAcceptedSymbol && startAcceptSymbolsIndex === undefined) {
            startAcceptSymbolsIndex = i;
        } else if(isAcceptedSymbol) {
            endAcceptSymbolsIndex = i;
        }
    }

    if(startAcceptSymbolsIndex === undefined) {
        return '';
    }

    if(endAcceptSymbolsIndex === undefined) {
        return str.slice(startAcceptSymbolsIndex, startAcceptSymbolsIndex + 1);
    }

    return str.slice(startAcceptSymbolsIndex, endAcceptSymbolsIndex + 1);
}

export function getKey(key: string, parentKey?: string) {
  return parentKey ? `${parentKey}[${key}]` : key;
}

export function getParams(data: PlainObject | [], parentKey?: string) {
  const result: [string, string][] = [];

  for(const [key, value] of Object.entries(data)) {
    if (isArrayOrObject(value)) {
      result.push(...getParams(value, getKey(key, parentKey)));
    } else {
      result.push([getKey(key, parentKey), encodeURIComponent(String(value))]);
    }
  }

  return result;
}

export function queryString(data: PlainObject) {
  if (!isPlainObject(data)) {
    throw new Error('input must be an object');
  }

  return getParams(data).map(arr => arr.join('=')).join('&');
}

export function isLength(value) {
  return (
    typeof value === "number" &&
    value > -1 &&
    value % 1 === 0 &&
    value <= Number.MAX_SAFE_INTEGER
  );
}

export function isNil(value) {
  return value === null || value === undefined;
}

export function isArrayLike(value) {
  return !isNil(value) && typeof value !== "function" && isLength(value.length);
}

export function isObjectLike(value) {
  return typeof value === "object" && value !== null;
}

export function getTag(value) {
  if (value === null) {
    return value === undefined ? "[object Undefined]" : "[object Null]";
  }
  return toString.call(value);
}

const objectProto = Object.prototype;

export function isPrototype(value) {
  const ctor = value && value.constructor;
  const proto = (typeof ctor === "function" && ctor.prototype) || objectProto;

  return value === proto;
}

export function isArguments(value) {
  return isObjectLike(value) && getTag(value) === "[object Arguments]";
}

// Реализация лодаша
export function isEmpty(value) {
  if (value === null) {
    return true;
  }

  if (
    isArrayLike(value) &&
    (Array.isArray(value) ||
      typeof value === "string" ||
      typeof value.splice === "function" ||
      isBuffer(value) ||
      isTypedArray(value) ||
      isArguments(value))
  ) {
    return !value.length;
  }

  const tag = getTag(value);
  if (tag === "[object Map]" || tag === "[object Set]") {
    return !value.size;
  }

  if (isPrototype(value)) {
    return !Object.keys(value).length;
  }

  for (const key in value) {
    if (hasOwnProperty.call(value, key)) {
      return false;
    }
  }

  return true;
}

export const baseRange = (start, end, step, isRight) => {
  let index = -1;
  let length = Math.max(Math.ceil((end - start) / (step || 1)), 0);
  const result = new Array(length);

  while (length--) {
    result[isRight ? length : ++index] = start;
    start += step;
  }

  return result;
}

// Проверку на типы данных не добавлял, но студенты должны будут
export function range(start = 0, end, step, isRight = false) {
		if (end === undefined) {
      end = start;
			start = 0;
    }

    step = step === undefined ? (start < end ? 1 : -1) : step;
    return baseRange(start, end, step, isRight);
}

export function rangeRight(start, end, step) {
		return range(start, end, step, true);
}

export function first(list) {
		if (!Array.isArray(list)) {
			return undefined;
		}
		
	    return list.length ? list[0] : undefined;
}

export function last(list) {
  if(Array.isArray(list)) {
    return list[list.length - 1];
  }
}