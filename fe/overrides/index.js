
"use client";

if (typeof window !== "undefined") {
  window.CODEIUM_REACT_CODE_VERSION = "1.0.12";
}
      import React, { memo, useState, useRef, useCallback, useEffect, useMemo } from 'react';

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise, SuppressedError, Symbol */


function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

// Copyright 2021-2023 Buf Technologies, Inc.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
/**
 * Assert that condition is truthy or throw error (with message)
 */
function assert(condition, msg) {
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions -- we want the implicit conversion to boolean
    if (!condition) {
        throw new Error(msg);
    }
}
const FLOAT32_MAX = 3.4028234663852886e38, FLOAT32_MIN = -3.4028234663852886e38, UINT32_MAX = 0xffffffff, INT32_MAX = 0x7fffffff, INT32_MIN = -0x80000000;
/**
 * Assert a valid signed protobuf 32-bit integer.
 */
function assertInt32(arg) {
    if (typeof arg !== "number")
        throw new Error("invalid int 32: " + typeof arg);
    if (!Number.isInteger(arg) || arg > INT32_MAX || arg < INT32_MIN)
        throw new Error("invalid int 32: " + arg); // eslint-disable-line @typescript-eslint/restrict-plus-operands -- we want the implicit conversion to string
}
/**
 * Assert a valid unsigned protobuf 32-bit integer.
 */
function assertUInt32(arg) {
    if (typeof arg !== "number")
        throw new Error("invalid uint 32: " + typeof arg);
    if (!Number.isInteger(arg) || arg > UINT32_MAX || arg < 0)
        throw new Error("invalid uint 32: " + arg); // eslint-disable-line @typescript-eslint/restrict-plus-operands -- we want the implicit conversion to string
}
/**
 * Assert a valid protobuf float value.
 */
function assertFloat32(arg) {
    if (typeof arg !== "number")
        throw new Error("invalid float 32: " + typeof arg);
    if (!Number.isFinite(arg))
        return;
    if (arg > FLOAT32_MAX || arg < FLOAT32_MIN)
        throw new Error("invalid float 32: " + arg); // eslint-disable-line @typescript-eslint/restrict-plus-operands -- we want the implicit conversion to string
}

// Copyright 2021-2023 Buf Technologies, Inc.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
const enumTypeSymbol = Symbol("@bufbuild/protobuf/enum-type");
/**
 * Get reflection information from a generated enum.
 * If this function is called on something other than a generated
 * enum, it raises an error.
 */
function getEnumType(enumObject) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-explicit-any
    const t = enumObject[enumTypeSymbol];
    assert(t, "missing enum type on enum object");
    return t; // eslint-disable-line @typescript-eslint/no-unsafe-return
}
/**
 * Sets reflection information on a generated enum.
 */
function setEnumType(enumObject, typeName, values, opt) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any
    enumObject[enumTypeSymbol] = makeEnumType(typeName, values.map((v) => ({
        no: v.no,
        name: v.name,
        localName: enumObject[v.no],
    })));
}
/**
 * Create a new EnumType with the given values.
 */
function makeEnumType(typeName, values, 
// eslint-disable-next-line @typescript-eslint/no-unused-vars
_opt) {
    const names = Object.create(null);
    const numbers = Object.create(null);
    const normalValues = [];
    for (const value of values) {
        // We do not surface options at this time
        // const value: EnumValueInfo = {...v, options: v.options ?? emptyReadonlyObject};
        const n = normalizeEnumValue(value);
        normalValues.push(n);
        names[value.name] = n;
        numbers[value.no] = n;
    }
    return {
        typeName,
        values: normalValues,
        // We do not surface options at this time
        // options: opt?.options ?? Object.create(null),
        findName(name) {
            return names[name];
        },
        findNumber(no) {
            return numbers[no];
        },
    };
}
/**
 * Create a new enum object with the given values.
 * Sets reflection information.
 */
function makeEnum(typeName, values, opt) {
    const enumObject = {};
    for (const value of values) {
        const n = normalizeEnumValue(value);
        enumObject[n.localName] = n.no;
        enumObject[n.no] = n.localName;
    }
    setEnumType(enumObject, typeName, values);
    return enumObject;
}
function normalizeEnumValue(value) {
    if ("localName" in value) {
        return value;
    }
    return Object.assign(Object.assign({}, value), { localName: value.name });
}

// Copyright 2021-2023 Buf Technologies, Inc.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
/**
 * Message is the base class of every message, generated, or created at
 * runtime.
 *
 * It is _not_ safe to extend this class. If you want to create a message at
 * run time, use proto3.makeMessageType().
 */
class Message {
    /**
     * Compare with a message of the same type.
     */
    equals(other) {
        return this.getType().runtime.util.equals(this.getType(), this, other);
    }
    /**
     * Create a deep copy.
     */
    clone() {
        return this.getType().runtime.util.clone(this);
    }
    /**
     * Parse from binary data, merging fields.
     *
     * Repeated fields are appended. Map entries are added, overwriting
     * existing keys.
     *
     * If a message field is already present, it will be merged with the
     * new data.
     */
    fromBinary(bytes, options) {
        const type = this.getType(), format = type.runtime.bin, opt = format.makeReadOptions(options);
        format.readMessage(this, opt.readerFactory(bytes), bytes.byteLength, opt);
        return this;
    }
    /**
     * Parse a message from a JSON value.
     */
    fromJson(jsonValue, options) {
        const type = this.getType(), format = type.runtime.json, opt = format.makeReadOptions(options);
        format.readMessage(type, jsonValue, opt, this);
        return this;
    }
    /**
     * Parse a message from a JSON string.
     */
    fromJsonString(jsonString, options) {
        let json;
        try {
            json = JSON.parse(jsonString);
        }
        catch (e) {
            throw new Error(`cannot decode ${this.getType().typeName} from JSON: ${e instanceof Error ? e.message : String(e)}`);
        }
        return this.fromJson(json, options);
    }
    /**
     * Serialize the message to binary data.
     */
    toBinary(options) {
        const type = this.getType(), bin = type.runtime.bin, opt = bin.makeWriteOptions(options), writer = opt.writerFactory();
        bin.writeMessage(this, writer, opt);
        return writer.finish();
    }
    /**
     * Serialize the message to a JSON value, a JavaScript value that can be
     * passed to JSON.stringify().
     */
    toJson(options) {
        const type = this.getType(), json = type.runtime.json, opt = json.makeWriteOptions(options);
        return json.writeMessage(this, opt);
    }
    /**
     * Serialize the message to a JSON string.
     */
    toJsonString(options) {
        var _a;
        const value = this.toJson(options);
        return JSON.stringify(value, null, (_a = options === null || options === void 0 ? void 0 : options.prettySpaces) !== null && _a !== void 0 ? _a : 0);
    }
    /**
     * Override for serialization behavior. This will be invoked when calling
     * JSON.stringify on this message (i.e. JSON.stringify(msg)).
     *
     * Note that this will not serialize google.protobuf.Any with a packed
     * message because the protobuf JSON format specifies that it needs to be
     * unpacked, and this is only possible with a type registry to look up the
     * message type.  As a result, attempting to serialize a message with this
     * type will throw an Error.
     *
     * This method is protected because you should not need to invoke it
     * directly -- instead use JSON.stringify or toJsonString for
     * stringified JSON.  Alternatively, if actual JSON is desired, you should
     * use toJson.
     */
    toJSON() {
        return this.toJson({
            emitDefaultValues: true,
        });
    }
    /**
     * Retrieve the MessageType of this message - a singleton that represents
     * the protobuf message declaration and provides metadata for reflection-
     * based operations.
     */
    getType() {
        // Any class that extends Message _must_ provide a complete static
        // implementation of MessageType.
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-return
        return Object.getPrototypeOf(this).constructor;
    }
}

// Copyright 2021-2023 Buf Technologies, Inc.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
/**
 * Create a new message type using the given runtime.
 */
function makeMessageType(runtime, typeName, fields, opt) {
    var _a;
    const localName = (_a = opt === null || opt === void 0 ? void 0 : opt.localName) !== null && _a !== void 0 ? _a : typeName.substring(typeName.lastIndexOf(".") + 1);
    const type = {
        [localName]: function (data) {
            runtime.util.initFields(this);
            runtime.util.initPartial(data, this);
        },
    }[localName];
    Object.setPrototypeOf(type.prototype, new Message());
    Object.assign(type, {
        runtime,
        typeName,
        fields: runtime.util.newFieldList(fields),
        fromBinary(bytes, options) {
            return new type().fromBinary(bytes, options);
        },
        fromJson(jsonValue, options) {
            return new type().fromJson(jsonValue, options);
        },
        fromJsonString(jsonString, options) {
            return new type().fromJsonString(jsonString, options);
        },
        equals(a, b) {
            return runtime.util.equals(type, a, b);
        },
    });
    return type;
}

// Copyright 2021-2023 Buf Technologies, Inc.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
function makeProtoRuntime(syntax, json, bin, util) {
    return {
        syntax,
        json,
        bin,
        util,
        makeMessageType(typeName, fields, opt) {
            return makeMessageType(this, typeName, fields, opt);
        },
        makeEnum,
        makeEnumType,
        getEnumType,
    };
}

// Copyright 2021-2023 Buf Technologies, Inc.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
/**
 * Scalar value types. This is a subset of field types declared by protobuf
 * enum google.protobuf.FieldDescriptorProto.Type The types GROUP and MESSAGE
 * are omitted, but the numerical values are identical.
 */
var ScalarType;
(function (ScalarType) {
    // 0 is reserved for errors.
    // Order is weird for historical reasons.
    ScalarType[ScalarType["DOUBLE"] = 1] = "DOUBLE";
    ScalarType[ScalarType["FLOAT"] = 2] = "FLOAT";
    // Not ZigZag encoded.  Negative numbers take 10 bytes.  Use TYPE_SINT64 if
    // negative values are likely.
    ScalarType[ScalarType["INT64"] = 3] = "INT64";
    ScalarType[ScalarType["UINT64"] = 4] = "UINT64";
    // Not ZigZag encoded.  Negative numbers take 10 bytes.  Use TYPE_SINT32 if
    // negative values are likely.
    ScalarType[ScalarType["INT32"] = 5] = "INT32";
    ScalarType[ScalarType["FIXED64"] = 6] = "FIXED64";
    ScalarType[ScalarType["FIXED32"] = 7] = "FIXED32";
    ScalarType[ScalarType["BOOL"] = 8] = "BOOL";
    ScalarType[ScalarType["STRING"] = 9] = "STRING";
    // Tag-delimited aggregate.
    // Group type is deprecated and not supported in proto3. However, Proto3
    // implementations should still be able to parse the group wire format and
    // treat group fields as unknown fields.
    // TYPE_GROUP = 10,
    // TYPE_MESSAGE = 11,  // Length-delimited aggregate.
    // New in version 2.
    ScalarType[ScalarType["BYTES"] = 12] = "BYTES";
    ScalarType[ScalarType["UINT32"] = 13] = "UINT32";
    // TYPE_ENUM = 14,
    ScalarType[ScalarType["SFIXED32"] = 15] = "SFIXED32";
    ScalarType[ScalarType["SFIXED64"] = 16] = "SFIXED64";
    ScalarType[ScalarType["SINT32"] = 17] = "SINT32";
    ScalarType[ScalarType["SINT64"] = 18] = "SINT64";
})(ScalarType || (ScalarType = {}));
/**
 * JavaScript representation of fields with 64 bit integral types (int64, uint64,
 * sint64, fixed64, sfixed64).
 *
 * This is a subset of google.protobuf.FieldOptions.JSType, which defines JS_NORMAL,
 * JS_STRING, and JS_NUMBER. Protobuf-ES uses BigInt by default, but will use
 * String if `[jstype = JS_STRING]` is specified.
 *
 * ```protobuf
 * uint64 field_a = 1; // BigInt
 * uint64 field_b = 2 [jstype = JS_NORMAL]; // BigInt
 * uint64 field_b = 2 [jstype = JS_NUMBER]; // BigInt
 * uint64 field_b = 2 [jstype = JS_STRING]; // String
 * ```
 */
var LongType;
(function (LongType) {
    /**
     * Use JavaScript BigInt.
     */
    LongType[LongType["BIGINT"] = 0] = "BIGINT";
    /**
     * Use JavaScript String.
     *
     * Field option `[jstype = JS_STRING]`.
     */
    LongType[LongType["STRING"] = 1] = "STRING";
})(LongType || (LongType = {}));

// Copyright 2008 Google Inc.  All rights reserved.
//
// Redistribution and use in source and binary forms, with or without
// modification, are permitted provided that the following conditions are
// met:
//
// * Redistributions of source code must retain the above copyright
// notice, this list of conditions and the following disclaimer.
// * Redistributions in binary form must reproduce the above
// copyright notice, this list of conditions and the following disclaimer
// in the documentation and/or other materials provided with the
// distribution.
// * Neither the name of Google Inc. nor the names of its
// contributors may be used to endorse or promote products derived from
// this software without specific prior written permission.
//
// THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
// "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
// LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
// A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
// OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
// SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
// LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
// DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
// THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
// (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
// OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
// Code generated by the Protocol Buffer compiler is owned by the owner
// of the input file used when generating it.  This code is not
// standalone and requires a support library to be linked with it.  This
// support library is itself covered by the above license.
/* eslint-disable prefer-const,@typescript-eslint/restrict-plus-operands */
/**
 * Read a 64 bit varint as two JS numbers.
 *
 * Returns tuple:
 * [0]: low bits
 * [1]: high bits
 *
 * Copyright 2008 Google Inc.  All rights reserved.
 *
 * See https://github.com/protocolbuffers/protobuf/blob/8a71927d74a4ce34efe2d8769fda198f52d20d12/js/experimental/runtime/kernel/buffer_decoder.js#L175
 */
function varint64read() {
    let lowBits = 0;
    let highBits = 0;
    for (let shift = 0; shift < 28; shift += 7) {
        let b = this.buf[this.pos++];
        lowBits |= (b & 0x7f) << shift;
        if ((b & 0x80) == 0) {
            this.assertBounds();
            return [lowBits, highBits];
        }
    }
    let middleByte = this.buf[this.pos++];
    // last four bits of the first 32 bit number
    lowBits |= (middleByte & 0x0f) << 28;
    // 3 upper bits are part of the next 32 bit number
    highBits = (middleByte & 0x70) >> 4;
    if ((middleByte & 0x80) == 0) {
        this.assertBounds();
        return [lowBits, highBits];
    }
    for (let shift = 3; shift <= 31; shift += 7) {
        let b = this.buf[this.pos++];
        highBits |= (b & 0x7f) << shift;
        if ((b & 0x80) == 0) {
            this.assertBounds();
            return [lowBits, highBits];
        }
    }
    throw new Error("invalid varint");
}
/**
 * Write a 64 bit varint, given as two JS numbers, to the given bytes array.
 *
 * Copyright 2008 Google Inc.  All rights reserved.
 *
 * See https://github.com/protocolbuffers/protobuf/blob/8a71927d74a4ce34efe2d8769fda198f52d20d12/js/experimental/runtime/kernel/writer.js#L344
 */
function varint64write(lo, hi, bytes) {
    for (let i = 0; i < 28; i = i + 7) {
        const shift = lo >>> i;
        const hasNext = !(shift >>> 7 == 0 && hi == 0);
        const byte = (hasNext ? shift | 0x80 : shift) & 0xff;
        bytes.push(byte);
        if (!hasNext) {
            return;
        }
    }
    const splitBits = ((lo >>> 28) & 0x0f) | ((hi & 0x07) << 4);
    const hasMoreBits = !(hi >> 3 == 0);
    bytes.push((hasMoreBits ? splitBits | 0x80 : splitBits) & 0xff);
    if (!hasMoreBits) {
        return;
    }
    for (let i = 3; i < 31; i = i + 7) {
        const shift = hi >>> i;
        const hasNext = !(shift >>> 7 == 0);
        const byte = (hasNext ? shift | 0x80 : shift) & 0xff;
        bytes.push(byte);
        if (!hasNext) {
            return;
        }
    }
    bytes.push((hi >>> 31) & 0x01);
}
// constants for binary math
const TWO_PWR_32_DBL = 0x100000000;
/**
 * Parse decimal string of 64 bit integer value as two JS numbers.
 *
 * Copyright 2008 Google Inc.  All rights reserved.
 *
 * See https://github.com/protocolbuffers/protobuf-javascript/blob/a428c58273abad07c66071d9753bc4d1289de426/experimental/runtime/int64.js#L10
 */
function int64FromString(dec) {
    // Check for minus sign.
    const minus = dec[0] === "-";
    if (minus) {
        dec = dec.slice(1);
    }
    // Work 6 decimal digits at a time, acting like we're converting base 1e6
    // digits to binary. This is safe to do with floating point math because
    // Number.isSafeInteger(ALL_32_BITS * 1e6) == true.
    const base = 1e6;
    let lowBits = 0;
    let highBits = 0;
    function add1e6digit(begin, end) {
        // Note: Number('') is 0.
        const digit1e6 = Number(dec.slice(begin, end));
        highBits *= base;
        lowBits = lowBits * base + digit1e6;
        // Carry bits from lowBits to
        if (lowBits >= TWO_PWR_32_DBL) {
            highBits = highBits + ((lowBits / TWO_PWR_32_DBL) | 0);
            lowBits = lowBits % TWO_PWR_32_DBL;
        }
    }
    add1e6digit(-24, -18);
    add1e6digit(-18, -12);
    add1e6digit(-12, -6);
    add1e6digit(-6);
    return minus ? negate(lowBits, highBits) : newBits(lowBits, highBits);
}
/**
 * Losslessly converts a 64-bit signed integer in 32:32 split representation
 * into a decimal string.
 *
 * Copyright 2008 Google Inc.  All rights reserved.
 *
 * See https://github.com/protocolbuffers/protobuf-javascript/blob/a428c58273abad07c66071d9753bc4d1289de426/experimental/runtime/int64.js#L10
 */
function int64ToString(lo, hi) {
    let bits = newBits(lo, hi);
    // If we're treating the input as a signed value and the high bit is set, do
    // a manual two's complement conversion before the decimal conversion.
    const negative = (bits.hi & 0x80000000);
    if (negative) {
        bits = negate(bits.lo, bits.hi);
    }
    const result = uInt64ToString(bits.lo, bits.hi);
    return negative ? "-" + result : result;
}
/**
 * Losslessly converts a 64-bit unsigned integer in 32:32 split representation
 * into a decimal string.
 *
 * Copyright 2008 Google Inc.  All rights reserved.
 *
 * See https://github.com/protocolbuffers/protobuf-javascript/blob/a428c58273abad07c66071d9753bc4d1289de426/experimental/runtime/int64.js#L10
 */
function uInt64ToString(lo, hi) {
    ({ lo, hi } = toUnsigned(lo, hi));
    // Skip the expensive conversion if the number is small enough to use the
    // built-in conversions.
    // Number.MAX_SAFE_INTEGER = 0x001FFFFF FFFFFFFF, thus any number with
    // highBits <= 0x1FFFFF can be safely expressed with a double and retain
    // integer precision.
    // Proven by: Number.isSafeInteger(0x1FFFFF * 2**32 + 0xFFFFFFFF) == true.
    if (hi <= 0x1FFFFF) {
        return String(TWO_PWR_32_DBL * hi + lo);
    }
    // What this code is doing is essentially converting the input number from
    // base-2 to base-1e7, which allows us to represent the 64-bit range with
    // only 3 (very large) digits. Those digits are then trivial to convert to
    // a base-10 string.
    // The magic numbers used here are -
    // 2^24 = 16777216 = (1,6777216) in base-1e7.
    // 2^48 = 281474976710656 = (2,8147497,6710656) in base-1e7.
    // Split 32:32 representation into 16:24:24 representation so our
    // intermediate digits don't overflow.
    const low = lo & 0xFFFFFF;
    const mid = ((lo >>> 24) | (hi << 8)) & 0xFFFFFF;
    const high = (hi >> 16) & 0xFFFF;
    // Assemble our three base-1e7 digits, ignoring carries. The maximum
    // value in a digit at this step is representable as a 48-bit integer, which
    // can be stored in a 64-bit floating point number.
    let digitA = low + (mid * 6777216) + (high * 6710656);
    let digitB = mid + (high * 8147497);
    let digitC = (high * 2);
    // Apply carries from A to B and from B to C.
    const base = 10000000;
    if (digitA >= base) {
        digitB += Math.floor(digitA / base);
        digitA %= base;
    }
    if (digitB >= base) {
        digitC += Math.floor(digitB / base);
        digitB %= base;
    }
    // If digitC is 0, then we should have returned in the trivial code path
    // at the top for non-safe integers. Given this, we can assume both digitB
    // and digitA need leading zeros.
    return digitC.toString() + decimalFrom1e7WithLeadingZeros(digitB) +
        decimalFrom1e7WithLeadingZeros(digitA);
}
function toUnsigned(lo, hi) {
    return { lo: lo >>> 0, hi: hi >>> 0 };
}
function newBits(lo, hi) {
    return { lo: lo | 0, hi: hi | 0 };
}
/**
 * Returns two's compliment negation of input.
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Bitwise_Operators#Signed_32-bit_integers
 */
function negate(lowBits, highBits) {
    highBits = ~highBits;
    if (lowBits) {
        lowBits = ~lowBits + 1;
    }
    else {
        // If lowBits is 0, then bitwise-not is 0xFFFFFFFF,
        // adding 1 to that, results in 0x100000000, which leaves
        // the low bits 0x0 and simply adds one to the high bits.
        highBits += 1;
    }
    return newBits(lowBits, highBits);
}
/**
 * Returns decimal representation of digit1e7 with leading zeros.
 */
const decimalFrom1e7WithLeadingZeros = (digit1e7) => {
    const partial = String(digit1e7);
    return "0000000".slice(partial.length) + partial;
};
/**
 * Write a 32 bit varint, signed or unsigned. Same as `varint64write(0, value, bytes)`
 *
 * Copyright 2008 Google Inc.  All rights reserved.
 *
 * See https://github.com/protocolbuffers/protobuf/blob/1b18833f4f2a2f681f4e4a25cdf3b0a43115ec26/js/binary/encoder.js#L144
 */
function varint32write(value, bytes) {
    if (value >= 0) {
        // write value as varint 32
        while (value > 0x7f) {
            bytes.push((value & 0x7f) | 0x80);
            value = value >>> 7;
        }
        bytes.push(value);
    }
    else {
        for (let i = 0; i < 9; i++) {
            bytes.push((value & 127) | 128);
            value = value >> 7;
        }
        bytes.push(1);
    }
}
/**
 * Read an unsigned 32 bit varint.
 *
 * See https://github.com/protocolbuffers/protobuf/blob/8a71927d74a4ce34efe2d8769fda198f52d20d12/js/experimental/runtime/kernel/buffer_decoder.js#L220
 */
function varint32read() {
    let b = this.buf[this.pos++];
    let result = b & 0x7f;
    if ((b & 0x80) == 0) {
        this.assertBounds();
        return result;
    }
    b = this.buf[this.pos++];
    result |= (b & 0x7f) << 7;
    if ((b & 0x80) == 0) {
        this.assertBounds();
        return result;
    }
    b = this.buf[this.pos++];
    result |= (b & 0x7f) << 14;
    if ((b & 0x80) == 0) {
        this.assertBounds();
        return result;
    }
    b = this.buf[this.pos++];
    result |= (b & 0x7f) << 21;
    if ((b & 0x80) == 0) {
        this.assertBounds();
        return result;
    }
    // Extract only last 4 bits
    b = this.buf[this.pos++];
    result |= (b & 0x0f) << 28;
    for (let readBytes = 5; (b & 0x80) !== 0 && readBytes < 10; readBytes++)
        b = this.buf[this.pos++];
    if ((b & 0x80) != 0)
        throw new Error("invalid varint");
    this.assertBounds();
    // Result can have 32 bits, convert it to unsigned
    return result >>> 0;
}

// Copyright 2021-2023 Buf Technologies, Inc.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
function makeInt64Support() {
    const dv = new DataView(new ArrayBuffer(8));
    // note that Safari 14 implements BigInt, but not the DataView methods
    const ok = typeof BigInt === "function" &&
        typeof dv.getBigInt64 === "function" &&
        typeof dv.getBigUint64 === "function" &&
        typeof dv.setBigInt64 === "function" &&
        typeof dv.setBigUint64 === "function" &&
        (typeof process != "object" ||
            typeof process.env != "object" ||
            process.env.BUF_BIGINT_DISABLE !== "1");
    if (ok) {
        const MIN = BigInt("-9223372036854775808"), MAX = BigInt("9223372036854775807"), UMIN = BigInt("0"), UMAX = BigInt("18446744073709551615");
        return {
            zero: BigInt(0),
            supported: true,
            parse(value) {
                const bi = typeof value == "bigint" ? value : BigInt(value);
                if (bi > MAX || bi < MIN) {
                    throw new Error(`int64 invalid: ${value}`);
                }
                return bi;
            },
            uParse(value) {
                const bi = typeof value == "bigint" ? value : BigInt(value);
                if (bi > UMAX || bi < UMIN) {
                    throw new Error(`uint64 invalid: ${value}`);
                }
                return bi;
            },
            enc(value) {
                dv.setBigInt64(0, this.parse(value), true);
                return {
                    lo: dv.getInt32(0, true),
                    hi: dv.getInt32(4, true),
                };
            },
            uEnc(value) {
                dv.setBigInt64(0, this.uParse(value), true);
                return {
                    lo: dv.getInt32(0, true),
                    hi: dv.getInt32(4, true),
                };
            },
            dec(lo, hi) {
                dv.setInt32(0, lo, true);
                dv.setInt32(4, hi, true);
                return dv.getBigInt64(0, true);
            },
            uDec(lo, hi) {
                dv.setInt32(0, lo, true);
                dv.setInt32(4, hi, true);
                return dv.getBigUint64(0, true);
            },
        };
    }
    const assertInt64String = (value) => assert(/^-?[0-9]+$/.test(value), `int64 invalid: ${value}`);
    const assertUInt64String = (value) => assert(/^[0-9]+$/.test(value), `uint64 invalid: ${value}`);
    return {
        zero: "0",
        supported: false,
        parse(value) {
            if (typeof value != "string") {
                value = value.toString();
            }
            assertInt64String(value);
            return value;
        },
        uParse(value) {
            if (typeof value != "string") {
                value = value.toString();
            }
            assertUInt64String(value);
            return value;
        },
        enc(value) {
            if (typeof value != "string") {
                value = value.toString();
            }
            assertInt64String(value);
            return int64FromString(value);
        },
        uEnc(value) {
            if (typeof value != "string") {
                value = value.toString();
            }
            assertUInt64String(value);
            return int64FromString(value);
        },
        dec(lo, hi) {
            return int64ToString(lo, hi);
        },
        uDec(lo, hi) {
            return uInt64ToString(lo, hi);
        },
    };
}
const protoInt64 = makeInt64Support();

// Copyright 2021-2023 Buf Technologies, Inc.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
/* eslint-disable prefer-const,no-case-declarations,@typescript-eslint/restrict-plus-operands */
/**
 * Protobuf binary format wire types.
 *
 * A wire type provides just enough information to find the length of the
 * following value.
 *
 * See https://developers.google.com/protocol-buffers/docs/encoding#structure
 */
var WireType;
(function (WireType) {
    /**
     * Used for int32, int64, uint32, uint64, sint32, sint64, bool, enum
     */
    WireType[WireType["Varint"] = 0] = "Varint";
    /**
     * Used for fixed64, sfixed64, double.
     * Always 8 bytes with little-endian byte order.
     */
    WireType[WireType["Bit64"] = 1] = "Bit64";
    /**
     * Used for string, bytes, embedded messages, packed repeated fields
     *
     * Only repeated numeric types (types which use the varint, 32-bit,
     * or 64-bit wire types) can be packed. In proto3, such fields are
     * packed by default.
     */
    WireType[WireType["LengthDelimited"] = 2] = "LengthDelimited";
    /**
     * Used for groups
     * @deprecated
     */
    WireType[WireType["StartGroup"] = 3] = "StartGroup";
    /**
     * Used for groups
     * @deprecated
     */
    WireType[WireType["EndGroup"] = 4] = "EndGroup";
    /**
     * Used for fixed32, sfixed32, float.
     * Always 4 bytes with little-endian byte order.
     */
    WireType[WireType["Bit32"] = 5] = "Bit32";
})(WireType || (WireType = {}));
class BinaryWriter {
    constructor(textEncoder) {
        /**
         * Previous fork states.
         */
        this.stack = [];
        this.textEncoder = textEncoder !== null && textEncoder !== void 0 ? textEncoder : new TextEncoder();
        this.chunks = [];
        this.buf = [];
    }
    /**
     * Return all bytes written and reset this writer.
     */
    finish() {
        this.chunks.push(new Uint8Array(this.buf)); // flush the buffer
        let len = 0;
        for (let i = 0; i < this.chunks.length; i++)
            len += this.chunks[i].length;
        let bytes = new Uint8Array(len);
        let offset = 0;
        for (let i = 0; i < this.chunks.length; i++) {
            bytes.set(this.chunks[i], offset);
            offset += this.chunks[i].length;
        }
        this.chunks = [];
        return bytes;
    }
    /**
     * Start a new fork for length-delimited data like a message
     * or a packed repeated field.
     *
     * Must be joined later with `join()`.
     */
    fork() {
        this.stack.push({ chunks: this.chunks, buf: this.buf });
        this.chunks = [];
        this.buf = [];
        return this;
    }
    /**
     * Join the last fork. Write its length and bytes, then
     * return to the previous state.
     */
    join() {
        // get chunk of fork
        let chunk = this.finish();
        // restore previous state
        let prev = this.stack.pop();
        if (!prev)
            throw new Error("invalid state, fork stack empty");
        this.chunks = prev.chunks;
        this.buf = prev.buf;
        // write length of chunk as varint
        this.uint32(chunk.byteLength);
        return this.raw(chunk);
    }
    /**
     * Writes a tag (field number and wire type).
     *
     * Equivalent to `uint32( (fieldNo << 3 | type) >>> 0 )`.
     *
     * Generated code should compute the tag ahead of time and call `uint32()`.
     */
    tag(fieldNo, type) {
        return this.uint32(((fieldNo << 3) | type) >>> 0);
    }
    /**
     * Write a chunk of raw bytes.
     */
    raw(chunk) {
        if (this.buf.length) {
            this.chunks.push(new Uint8Array(this.buf));
            this.buf = [];
        }
        this.chunks.push(chunk);
        return this;
    }
    /**
     * Write a `uint32` value, an unsigned 32 bit varint.
     */
    uint32(value) {
        assertUInt32(value);
        // write value as varint 32, inlined for speed
        while (value > 0x7f) {
            this.buf.push((value & 0x7f) | 0x80);
            value = value >>> 7;
        }
        this.buf.push(value);
        return this;
    }
    /**
     * Write a `int32` value, a signed 32 bit varint.
     */
    int32(value) {
        assertInt32(value);
        varint32write(value, this.buf);
        return this;
    }
    /**
     * Write a `bool` value, a variant.
     */
    bool(value) {
        this.buf.push(value ? 1 : 0);
        return this;
    }
    /**
     * Write a `bytes` value, length-delimited arbitrary data.
     */
    bytes(value) {
        this.uint32(value.byteLength); // write length of chunk as varint
        return this.raw(value);
    }
    /**
     * Write a `string` value, length-delimited data converted to UTF-8 text.
     */
    string(value) {
        let chunk = this.textEncoder.encode(value);
        this.uint32(chunk.byteLength); // write length of chunk as varint
        return this.raw(chunk);
    }
    /**
     * Write a `float` value, 32-bit floating point number.
     */
    float(value) {
        assertFloat32(value);
        let chunk = new Uint8Array(4);
        new DataView(chunk.buffer).setFloat32(0, value, true);
        return this.raw(chunk);
    }
    /**
     * Write a `double` value, a 64-bit floating point number.
     */
    double(value) {
        let chunk = new Uint8Array(8);
        new DataView(chunk.buffer).setFloat64(0, value, true);
        return this.raw(chunk);
    }
    /**
     * Write a `fixed32` value, an unsigned, fixed-length 32-bit integer.
     */
    fixed32(value) {
        assertUInt32(value);
        let chunk = new Uint8Array(4);
        new DataView(chunk.buffer).setUint32(0, value, true);
        return this.raw(chunk);
    }
    /**
     * Write a `sfixed32` value, a signed, fixed-length 32-bit integer.
     */
    sfixed32(value) {
        assertInt32(value);
        let chunk = new Uint8Array(4);
        new DataView(chunk.buffer).setInt32(0, value, true);
        return this.raw(chunk);
    }
    /**
     * Write a `sint32` value, a signed, zigzag-encoded 32-bit varint.
     */
    sint32(value) {
        assertInt32(value);
        // zigzag encode
        value = ((value << 1) ^ (value >> 31)) >>> 0;
        varint32write(value, this.buf);
        return this;
    }
    /**
     * Write a `fixed64` value, a signed, fixed-length 64-bit integer.
     */
    sfixed64(value) {
        let chunk = new Uint8Array(8), view = new DataView(chunk.buffer), tc = protoInt64.enc(value);
        view.setInt32(0, tc.lo, true);
        view.setInt32(4, tc.hi, true);
        return this.raw(chunk);
    }
    /**
     * Write a `fixed64` value, an unsigned, fixed-length 64 bit integer.
     */
    fixed64(value) {
        let chunk = new Uint8Array(8), view = new DataView(chunk.buffer), tc = protoInt64.uEnc(value);
        view.setInt32(0, tc.lo, true);
        view.setInt32(4, tc.hi, true);
        return this.raw(chunk);
    }
    /**
     * Write a `int64` value, a signed 64-bit varint.
     */
    int64(value) {
        let tc = protoInt64.enc(value);
        varint64write(tc.lo, tc.hi, this.buf);
        return this;
    }
    /**
     * Write a `sint64` value, a signed, zig-zag-encoded 64-bit varint.
     */
    sint64(value) {
        let tc = protoInt64.enc(value), 
        // zigzag encode
        sign = tc.hi >> 31, lo = (tc.lo << 1) ^ sign, hi = ((tc.hi << 1) | (tc.lo >>> 31)) ^ sign;
        varint64write(lo, hi, this.buf);
        return this;
    }
    /**
     * Write a `uint64` value, an unsigned 64-bit varint.
     */
    uint64(value) {
        let tc = protoInt64.uEnc(value);
        varint64write(tc.lo, tc.hi, this.buf);
        return this;
    }
}
class BinaryReader {
    constructor(buf, textDecoder) {
        this.varint64 = varint64read; // dirty cast for `this`
        /**
         * Read a `uint32` field, an unsigned 32 bit varint.
         */
        this.uint32 = varint32read; // dirty cast for `this` and access to protected `buf`
        this.buf = buf;
        this.len = buf.length;
        this.pos = 0;
        this.view = new DataView(buf.buffer, buf.byteOffset, buf.byteLength);
        this.textDecoder = textDecoder !== null && textDecoder !== void 0 ? textDecoder : new TextDecoder();
    }
    /**
     * Reads a tag - field number and wire type.
     */
    tag() {
        let tag = this.uint32(), fieldNo = tag >>> 3, wireType = tag & 7;
        if (fieldNo <= 0 || wireType < 0 || wireType > 5)
            throw new Error("illegal tag: field no " + fieldNo + " wire type " + wireType);
        return [fieldNo, wireType];
    }
    /**
     * Skip one element on the wire and return the skipped data.
     * Supports WireType.StartGroup since v2.0.0-alpha.23.
     */
    skip(wireType) {
        let start = this.pos;
        switch (wireType) {
            case WireType.Varint:
                while (this.buf[this.pos++] & 0x80) {
                    // ignore
                }
                break;
            // eslint-disable-next-line
            // @ts-ignore TS7029: Fallthrough case in switch
            case WireType.Bit64:
                this.pos += 4;
            // eslint-disable-next-line
            // @ts-ignore TS7029: Fallthrough case in switch
            case WireType.Bit32:
                this.pos += 4;
                break;
            case WireType.LengthDelimited:
                let len = this.uint32();
                this.pos += len;
                break;
            case WireType.StartGroup:
                // From descriptor.proto: Group type is deprecated, not supported in proto3.
                // But we must still be able to parse and treat as unknown.
                let t;
                while ((t = this.tag()[1]) !== WireType.EndGroup) {
                    this.skip(t);
                }
                break;
            default:
                throw new Error("cant skip wire type " + wireType);
        }
        this.assertBounds();
        return this.buf.subarray(start, this.pos);
    }
    /**
     * Throws error if position in byte array is out of range.
     */
    assertBounds() {
        if (this.pos > this.len)
            throw new RangeError("premature EOF");
    }
    /**
     * Read a `int32` field, a signed 32 bit varint.
     */
    int32() {
        return this.uint32() | 0;
    }
    /**
     * Read a `sint32` field, a signed, zigzag-encoded 32-bit varint.
     */
    sint32() {
        let zze = this.uint32();
        // decode zigzag
        return (zze >>> 1) ^ -(zze & 1);
    }
    /**
     * Read a `int64` field, a signed 64-bit varint.
     */
    int64() {
        return protoInt64.dec(...this.varint64());
    }
    /**
     * Read a `uint64` field, an unsigned 64-bit varint.
     */
    uint64() {
        return protoInt64.uDec(...this.varint64());
    }
    /**
     * Read a `sint64` field, a signed, zig-zag-encoded 64-bit varint.
     */
    sint64() {
        let [lo, hi] = this.varint64();
        // decode zig zag
        let s = -(lo & 1);
        lo = ((lo >>> 1) | ((hi & 1) << 31)) ^ s;
        hi = (hi >>> 1) ^ s;
        return protoInt64.dec(lo, hi);
    }
    /**
     * Read a `bool` field, a variant.
     */
    bool() {
        let [lo, hi] = this.varint64();
        return lo !== 0 || hi !== 0;
    }
    /**
     * Read a `fixed32` field, an unsigned, fixed-length 32-bit integer.
     */
    fixed32() {
        return this.view.getUint32((this.pos += 4) - 4, true);
    }
    /**
     * Read a `sfixed32` field, a signed, fixed-length 32-bit integer.
     */
    sfixed32() {
        return this.view.getInt32((this.pos += 4) - 4, true);
    }
    /**
     * Read a `fixed64` field, an unsigned, fixed-length 64 bit integer.
     */
    fixed64() {
        return protoInt64.uDec(this.sfixed32(), this.sfixed32());
    }
    /**
     * Read a `fixed64` field, a signed, fixed-length 64-bit integer.
     */
    sfixed64() {
        return protoInt64.dec(this.sfixed32(), this.sfixed32());
    }
    /**
     * Read a `float` field, 32-bit floating point number.
     */
    float() {
        return this.view.getFloat32((this.pos += 4) - 4, true);
    }
    /**
     * Read a `double` field, a 64-bit floating point number.
     */
    double() {
        return this.view.getFloat64((this.pos += 8) - 8, true);
    }
    /**
     * Read a `bytes` field, length-delimited arbitrary data.
     */
    bytes() {
        let len = this.uint32(), start = this.pos;
        this.pos += len;
        this.assertBounds();
        return this.buf.subarray(start, start + len);
    }
    /**
     * Read a `string` field, length-delimited data converted to UTF-8 text.
     */
    string() {
        return this.textDecoder.decode(this.bytes());
    }
}

// Copyright 2021-2023 Buf Technologies, Inc.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
/**
 * Wrap a primitive message field value in its corresponding wrapper
 * message. This function is idempotent.
 */
function wrapField(type, value) {
    if (value instanceof Message || !type.fieldWrapper) {
        return value;
    }
    return type.fieldWrapper.wrapField(value);
}
({
    "google.protobuf.DoubleValue": ScalarType.DOUBLE,
    "google.protobuf.FloatValue": ScalarType.FLOAT,
    "google.protobuf.Int64Value": ScalarType.INT64,
    "google.protobuf.UInt64Value": ScalarType.UINT64,
    "google.protobuf.Int32Value": ScalarType.INT32,
    "google.protobuf.UInt32Value": ScalarType.UINT32,
    "google.protobuf.BoolValue": ScalarType.BOOL,
    "google.protobuf.StringValue": ScalarType.STRING,
    "google.protobuf.BytesValue": ScalarType.BYTES,
});

// Copyright 2021-2023 Buf Technologies, Inc.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Returns true if both scalar values are equal.
 */
function scalarEquals(type, a, b) {
    if (a === b) {
        // This correctly matches equal values except BYTES and (possibly) 64-bit integers.
        return true;
    }
    // Special case BYTES - we need to compare each byte individually
    if (type == ScalarType.BYTES) {
        if (!(a instanceof Uint8Array) || !(b instanceof Uint8Array)) {
            return false;
        }
        if (a.length !== b.length) {
            return false;
        }
        for (let i = 0; i < a.length; i++) {
            if (a[i] !== b[i]) {
                return false;
            }
        }
        return true;
    }
    // Special case 64-bit integers - we support number, string and bigint representation.
    // eslint-disable-next-line @typescript-eslint/switch-exhaustiveness-check
    switch (type) {
        case ScalarType.UINT64:
        case ScalarType.FIXED64:
        case ScalarType.INT64:
        case ScalarType.SFIXED64:
        case ScalarType.SINT64:
            // Loose comparison will match between 0n, 0 and "0".
            return a == b;
    }
    // Anything that hasn't been caught by strict comparison or special cased
    // BYTES and 64-bit integers is not equal.
    return false;
}
/**
 * Returns the default value for the given scalar type, following
 * proto3 semantics.
 */
function scalarDefaultValue(type, longType) {
    switch (type) {
        case ScalarType.BOOL:
            return false;
        case ScalarType.UINT64:
        case ScalarType.FIXED64:
        case ScalarType.INT64:
        case ScalarType.SFIXED64:
        case ScalarType.SINT64:
            // eslint-disable-next-line @typescript-eslint/no-unsafe-enum-comparison -- acceptable since it's covered by tests
            return longType == 0 ? protoInt64.zero : "0";
        case ScalarType.DOUBLE:
        case ScalarType.FLOAT:
            return 0.0;
        case ScalarType.BYTES:
            return new Uint8Array(0);
        case ScalarType.STRING:
            return "";
        default:
            // Handles INT32, UINT32, SINT32, FIXED32, SFIXED32.
            // We do not use individual cases to save a few bytes code size.
            return 0;
    }
}
/**
 * Get information for writing a scalar value.
 *
 * Returns tuple:
 * [0]: appropriate WireType
 * [1]: name of the appropriate method of IBinaryWriter
 * [2]: whether the given value is a default value for proto3 semantics
 *
 * If argument `value` is omitted, [2] is always false.
 */
function scalarTypeInfo(type, value) {
    const isUndefined = value === undefined;
    let wireType = WireType.Varint;
    let isIntrinsicDefault = value === 0;
    // eslint-disable-next-line @typescript-eslint/switch-exhaustiveness-check -- INT32, UINT32, SINT32 are covered by the defaults
    switch (type) {
        case ScalarType.STRING:
            isIntrinsicDefault = isUndefined || !value.length;
            wireType = WireType.LengthDelimited;
            break;
        case ScalarType.BOOL:
            isIntrinsicDefault = value === false;
            break;
        case ScalarType.DOUBLE:
            wireType = WireType.Bit64;
            break;
        case ScalarType.FLOAT:
            wireType = WireType.Bit32;
            break;
        case ScalarType.INT64:
            isIntrinsicDefault = isUndefined || value == 0; // Loose comparison matches 0n, 0 and "0"
            break;
        case ScalarType.UINT64:
            isIntrinsicDefault = isUndefined || value == 0; // Loose comparison matches 0n, 0 and "0"
            break;
        case ScalarType.FIXED64:
            isIntrinsicDefault = isUndefined || value == 0; // Loose comparison matches 0n, 0 and "0"
            wireType = WireType.Bit64;
            break;
        case ScalarType.BYTES:
            isIntrinsicDefault = isUndefined || !value.byteLength;
            wireType = WireType.LengthDelimited;
            break;
        case ScalarType.FIXED32:
            wireType = WireType.Bit32;
            break;
        case ScalarType.SFIXED32:
            wireType = WireType.Bit32;
            break;
        case ScalarType.SFIXED64:
            isIntrinsicDefault = isUndefined || value == 0;
            wireType = WireType.Bit64;
            break;
        case ScalarType.SINT64:
            isIntrinsicDefault = isUndefined || value == 0;
            break;
    }
    const method = ScalarType[type].toLowerCase();
    return [wireType, method, isUndefined || isIntrinsicDefault];
}

// Copyright 2021-2023 Buf Technologies, Inc.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
/* eslint-disable @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unnecessary-condition, no-case-declarations, prefer-const */
const unknownFieldsSymbol = Symbol("@bufbuild/protobuf/unknown-fields");
// Default options for parsing binary data.
const readDefaults = {
    readUnknownFields: true,
    readerFactory: (bytes) => new BinaryReader(bytes),
};
// Default options for serializing binary data.
const writeDefaults = {
    writeUnknownFields: true,
    writerFactory: () => new BinaryWriter(),
};
function makeReadOptions$1(options) {
    return options ? Object.assign(Object.assign({}, readDefaults), options) : readDefaults;
}
function makeWriteOptions$1(options) {
    return options ? Object.assign(Object.assign({}, writeDefaults), options) : writeDefaults;
}
function makeBinaryFormatCommon() {
    return {
        makeReadOptions: makeReadOptions$1,
        makeWriteOptions: makeWriteOptions$1,
        listUnknownFields(message) {
            var _a;
            return (_a = message[unknownFieldsSymbol]) !== null && _a !== void 0 ? _a : [];
        },
        discardUnknownFields(message) {
            delete message[unknownFieldsSymbol];
        },
        writeUnknownFields(message, writer) {
            const m = message;
            const c = m[unknownFieldsSymbol];
            if (c) {
                for (const f of c) {
                    writer.tag(f.no, f.wireType).raw(f.data);
                }
            }
        },
        onUnknownField(message, no, wireType, data) {
            const m = message;
            if (!Array.isArray(m[unknownFieldsSymbol])) {
                m[unknownFieldsSymbol] = [];
            }
            m[unknownFieldsSymbol].push({ no, wireType, data });
        },
        readMessage(message, reader, length, options) {
            const type = message.getType();
            const end = length === undefined ? reader.len : reader.pos + length;
            while (reader.pos < end) {
                const [fieldNo, wireType] = reader.tag(), field = type.fields.find(fieldNo);
                if (!field) {
                    const data = reader.skip(wireType);
                    if (options.readUnknownFields) {
                        this.onUnknownField(message, fieldNo, wireType, data);
                    }
                    continue;
                }
                let target = message, repeated = field.repeated, localName = field.localName;
                if (field.oneof) {
                    target = target[field.oneof.localName];
                    if (target.case != localName) {
                        delete target.value;
                    }
                    target.case = localName;
                    localName = "value";
                }
                switch (field.kind) {
                    case "scalar":
                    case "enum":
                        const scalarType = field.kind == "enum" ? ScalarType.INT32 : field.T;
                        let read = readScalar$1;
                        // eslint-disable-next-line @typescript-eslint/no-unsafe-enum-comparison -- acceptable since it's covered by tests
                        if (field.kind == "scalar" && field.L > 0) {
                            read = readScalarLTString;
                        }
                        if (repeated) {
                            let arr = target[localName]; // safe to assume presence of array, oneof cannot contain repeated values
                            if (wireType == WireType.LengthDelimited &&
                                scalarType != ScalarType.STRING &&
                                scalarType != ScalarType.BYTES) {
                                let e = reader.uint32() + reader.pos;
                                while (reader.pos < e) {
                                    arr.push(read(reader, scalarType));
                                }
                            }
                            else {
                                arr.push(read(reader, scalarType));
                            }
                        }
                        else {
                            target[localName] = read(reader, scalarType);
                        }
                        break;
                    case "message":
                        const messageType = field.T;
                        if (repeated) {
                            // safe to assume presence of array, oneof cannot contain repeated values
                            target[localName].push(readMessageField(reader, new messageType(), options));
                        }
                        else {
                            if (target[localName] instanceof Message) {
                                readMessageField(reader, target[localName], options);
                            }
                            else {
                                target[localName] = readMessageField(reader, new messageType(), options);
                                if (messageType.fieldWrapper &&
                                    !field.oneof &&
                                    !field.repeated) {
                                    target[localName] = messageType.fieldWrapper.unwrapField(target[localName]);
                                }
                            }
                        }
                        break;
                    case "map":
                        let [mapKey, mapVal] = readMapEntry(field, reader, options);
                        // safe to assume presence of map object, oneof cannot contain repeated values
                        target[localName][mapKey] = mapVal;
                        break;
                }
            }
        },
    };
}
// Read a message, avoiding MessageType.fromBinary() to re-use the
// BinaryReadOptions and the IBinaryReader.
function readMessageField(reader, message, options) {
    const format = message.getType().runtime.bin;
    format.readMessage(message, reader, reader.uint32(), options);
    return message;
}
// Read a map field, expecting key field = 1, value field = 2
function readMapEntry(field, reader, options) {
    const length = reader.uint32(), end = reader.pos + length;
    let key, val;
    while (reader.pos < end) {
        let [fieldNo] = reader.tag();
        switch (fieldNo) {
            case 1:
                key = readScalar$1(reader, field.K);
                break;
            case 2:
                switch (field.V.kind) {
                    case "scalar":
                        val = readScalar$1(reader, field.V.T);
                        break;
                    case "enum":
                        val = reader.int32();
                        break;
                    case "message":
                        val = readMessageField(reader, new field.V.T(), options);
                        break;
                }
                break;
        }
    }
    if (key === undefined) {
        let keyRaw = scalarDefaultValue(field.K, LongType.BIGINT);
        key =
            field.K == ScalarType.BOOL
                ? keyRaw.toString()
                : keyRaw;
    }
    if (typeof key != "string" && typeof key != "number") {
        key = key.toString();
    }
    if (val === undefined) {
        switch (field.V.kind) {
            case "scalar":
                val = scalarDefaultValue(field.V.T, LongType.BIGINT);
                break;
            case "enum":
                val = 0;
                break;
            case "message":
                val = new field.V.T();
                break;
        }
    }
    return [key, val];
}
// Read a scalar value, but return 64 bit integral types (int64, uint64,
// sint64, fixed64, sfixed64) as string instead of bigint.
function readScalarLTString(reader, type) {
    const v = readScalar$1(reader, type);
    return typeof v == "bigint" ? v.toString() : v;
}
// Does not use scalarTypeInfo() for better performance.
function readScalar$1(reader, type) {
    switch (type) {
        case ScalarType.STRING:
            return reader.string();
        case ScalarType.BOOL:
            return reader.bool();
        case ScalarType.DOUBLE:
            return reader.double();
        case ScalarType.FLOAT:
            return reader.float();
        case ScalarType.INT32:
            return reader.int32();
        case ScalarType.INT64:
            return reader.int64();
        case ScalarType.UINT64:
            return reader.uint64();
        case ScalarType.FIXED64:
            return reader.fixed64();
        case ScalarType.BYTES:
            return reader.bytes();
        case ScalarType.FIXED32:
            return reader.fixed32();
        case ScalarType.SFIXED32:
            return reader.sfixed32();
        case ScalarType.SFIXED64:
            return reader.sfixed64();
        case ScalarType.SINT64:
            return reader.sint64();
        case ScalarType.UINT32:
            return reader.uint32();
        case ScalarType.SINT32:
            return reader.sint32();
    }
}
function writeMapEntry(writer, options, field, key, value) {
    writer.tag(field.no, WireType.LengthDelimited);
    writer.fork();
    // javascript only allows number or string for object properties
    // we convert from our representation to the protobuf type
    let keyValue = key;
    // eslint-disable-next-line @typescript-eslint/switch-exhaustiveness-check -- we deliberately handle just the special cases for map keys
    switch (field.K) {
        case ScalarType.INT32:
        case ScalarType.FIXED32:
        case ScalarType.UINT32:
        case ScalarType.SFIXED32:
        case ScalarType.SINT32:
            keyValue = Number.parseInt(key);
            break;
        case ScalarType.BOOL:
            assert(key == "true" || key == "false");
            keyValue = key == "true";
            break;
    }
    // write key, expecting key field number = 1
    writeScalar$1(writer, field.K, 1, keyValue, true);
    // write value, expecting value field number = 2
    switch (field.V.kind) {
        case "scalar":
            writeScalar$1(writer, field.V.T, 2, value, true);
            break;
        case "enum":
            writeScalar$1(writer, ScalarType.INT32, 2, value, true);
            break;
        case "message":
            writeMessageField(writer, options, field.V.T, 2, value);
            break;
    }
    writer.join();
}
function writeMessageField(writer, options, type, fieldNo, value) {
    if (value !== undefined) {
        const message = wrapField(type, value);
        writer
            .tag(fieldNo, WireType.LengthDelimited)
            .bytes(message.toBinary(options));
    }
}
function writeScalar$1(writer, type, fieldNo, value, emitIntrinsicDefault) {
    let [wireType, method, isIntrinsicDefault] = scalarTypeInfo(type, value);
    if (!isIntrinsicDefault || emitIntrinsicDefault) {
        writer.tag(fieldNo, wireType)[method](value);
    }
}
function writePacked(writer, type, fieldNo, value) {
    if (!value.length) {
        return;
    }
    writer.tag(fieldNo, WireType.LengthDelimited).fork();
    let [, method] = scalarTypeInfo(type);
    for (let i = 0; i < value.length; i++) {
        writer[method](value[i]);
    }
    writer.join();
}

// Copyright 2021-2023 Buf Technologies, Inc.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
/* eslint-disable @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unnecessary-condition, @typescript-eslint/strict-boolean-expressions, prefer-const, no-case-declarations */
function makeBinaryFormatProto3() {
    return Object.assign(Object.assign({}, makeBinaryFormatCommon()), { writeMessage(message, writer, options) {
            const type = message.getType();
            for (const field of type.fields.byNumber()) {
                let value, // this will be our field value, whether it is member of a oneof or regular field
                repeated = field.repeated, localName = field.localName;
                if (field.oneof) {
                    const oneof = message[field.oneof.localName];
                    if (oneof.case !== localName) {
                        continue; // field is not selected, skip
                    }
                    value = oneof.value;
                }
                else {
                    value = message[localName];
                }
                switch (field.kind) {
                    case "scalar":
                    case "enum":
                        let scalarType = field.kind == "enum" ? ScalarType.INT32 : field.T;
                        if (repeated) {
                            if (field.packed) {
                                writePacked(writer, scalarType, field.no, value);
                            }
                            else {
                                for (const item of value) {
                                    writeScalar$1(writer, scalarType, field.no, item, true);
                                }
                            }
                        }
                        else {
                            if (value !== undefined) {
                                writeScalar$1(writer, scalarType, field.no, value, !!field.oneof || field.opt);
                            }
                        }
                        break;
                    case "message":
                        if (repeated) {
                            for (const item of value) {
                                writeMessageField(writer, options, field.T, field.no, item);
                            }
                        }
                        else {
                            writeMessageField(writer, options, field.T, field.no, value);
                        }
                        break;
                    case "map":
                        for (const [key, val] of Object.entries(value)) {
                            writeMapEntry(writer, options, field, key, val);
                        }
                        break;
                }
            }
            if (options.writeUnknownFields) {
                this.writeUnknownFields(message, writer);
            }
            return writer;
        } });
}

// Copyright 2021-2023 Buf Technologies, Inc.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
/* eslint-disable @typescript-eslint/ban-ts-comment, @typescript-eslint/no-unnecessary-condition, prefer-const */
// lookup table from base64 character to byte
let encTable = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".split("");
// lookup table from base64 character *code* to byte because lookup by number is fast
let decTable = [];
for (let i = 0; i < encTable.length; i++)
    decTable[encTable[i].charCodeAt(0)] = i;
// support base64url variants
decTable["-".charCodeAt(0)] = encTable.indexOf("+");
decTable["_".charCodeAt(0)] = encTable.indexOf("/");
const protoBase64 = {
    /**
     * Decodes a base64 string to a byte array.
     *
     * - ignores white-space, including line breaks and tabs
     * - allows inner padding (can decode concatenated base64 strings)
     * - does not require padding
     * - understands base64url encoding:
     *   "-" instead of "+",
     *   "_" instead of "/",
     *   no padding
     */
    dec(base64Str) {
        // estimate byte size, not accounting for inner padding and whitespace
        let es = (base64Str.length * 3) / 4;
        if (base64Str[base64Str.length - 2] == "=")
            es -= 2;
        else if (base64Str[base64Str.length - 1] == "=")
            es -= 1;
        let bytes = new Uint8Array(es), bytePos = 0, // position in byte array
        groupPos = 0, // position in base64 group
        b, // current byte
        p = 0; // previous byte
        for (let i = 0; i < base64Str.length; i++) {
            b = decTable[base64Str.charCodeAt(i)];
            if (b === undefined) {
                switch (base64Str[i]) {
                    // @ts-ignore TS7029: Fallthrough case in switch
                    case "=":
                        groupPos = 0; // reset state when padding found
                    // @ts-ignore TS7029: Fallthrough case in switch
                    case "\n":
                    case "\r":
                    case "\t":
                    case " ":
                        continue; // skip white-space, and padding
                    default:
                        throw Error("invalid base64 string.");
                }
            }
            switch (groupPos) {
                case 0:
                    p = b;
                    groupPos = 1;
                    break;
                case 1:
                    bytes[bytePos++] = (p << 2) | ((b & 48) >> 4);
                    p = b;
                    groupPos = 2;
                    break;
                case 2:
                    bytes[bytePos++] = ((p & 15) << 4) | ((b & 60) >> 2);
                    p = b;
                    groupPos = 3;
                    break;
                case 3:
                    bytes[bytePos++] = ((p & 3) << 6) | b;
                    groupPos = 0;
                    break;
            }
        }
        if (groupPos == 1)
            throw Error("invalid base64 string.");
        return bytes.subarray(0, bytePos);
    },
    /**
     * Encode a byte array to a base64 string.
     */
    enc(bytes) {
        let base64 = "", groupPos = 0, // position in base64 group
        b, // current byte
        p = 0; // carry over from previous byte
        for (let i = 0; i < bytes.length; i++) {
            b = bytes[i];
            switch (groupPos) {
                case 0:
                    base64 += encTable[b >> 2];
                    p = (b & 3) << 4;
                    groupPos = 1;
                    break;
                case 1:
                    base64 += encTable[p | (b >> 4)];
                    p = (b & 15) << 2;
                    groupPos = 2;
                    break;
                case 2:
                    base64 += encTable[p | (b >> 6)];
                    base64 += encTable[b & 63];
                    groupPos = 0;
                    break;
            }
        }
        // add output padding
        if (groupPos) {
            base64 += encTable[p];
            base64 += "=";
            if (groupPos == 1)
                base64 += "=";
        }
        return base64;
    },
};

// Copyright 2021-2023 Buf Technologies, Inc.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
/* eslint-disable no-case-declarations, @typescript-eslint/restrict-plus-operands,@typescript-eslint/no-explicit-any,@typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-argument */
// Default options for parsing JSON.
const jsonReadDefaults = {
    ignoreUnknownFields: false,
};
// Default options for serializing to JSON.
const jsonWriteDefaults = {
    emitDefaultValues: false,
    enumAsInteger: false,
    useProtoFieldName: false,
    prettySpaces: 0,
};
function makeReadOptions(options) {
    return options ? Object.assign(Object.assign({}, jsonReadDefaults), options) : jsonReadDefaults;
}
function makeWriteOptions(options) {
    return options ? Object.assign(Object.assign({}, jsonWriteDefaults), options) : jsonWriteDefaults;
}
function makeJsonFormatCommon(makeWriteField) {
    const writeField = makeWriteField(writeEnum, writeScalar);
    return {
        makeReadOptions,
        makeWriteOptions,
        readMessage(type, json, options, message) {
            if (json == null || Array.isArray(json) || typeof json != "object") {
                throw new Error(`cannot decode message ${type.typeName} from JSON: ${this.debug(json)}`);
            }
            message = message !== null && message !== void 0 ? message : new type();
            const oneofSeen = {};
            for (const [jsonKey, jsonValue] of Object.entries(json)) {
                const field = type.fields.findJsonName(jsonKey);
                if (!field) {
                    if (!options.ignoreUnknownFields) {
                        throw new Error(`cannot decode message ${type.typeName} from JSON: key "${jsonKey}" is unknown`);
                    }
                    continue;
                }
                let localName = field.localName;
                let target = message;
                if (field.oneof) {
                    if (jsonValue === null && field.kind == "scalar") {
                        // see conformance test Required.Proto3.JsonInput.OneofFieldNull{First,Second}
                        continue;
                    }
                    const seen = oneofSeen[field.oneof.localName];
                    if (seen) {
                        throw new Error(`cannot decode message ${type.typeName} from JSON: multiple keys for oneof "${field.oneof.name}" present: "${seen}", "${jsonKey}"`);
                    }
                    oneofSeen[field.oneof.localName] = jsonKey;
                    target = target[field.oneof.localName] = { case: localName };
                    localName = "value";
                }
                if (field.repeated) {
                    if (jsonValue === null) {
                        continue;
                    }
                    if (!Array.isArray(jsonValue)) {
                        throw new Error(`cannot decode field ${type.typeName}.${field.name} from JSON: ${this.debug(jsonValue)}`);
                    }
                    const targetArray = target[localName];
                    for (const jsonItem of jsonValue) {
                        if (jsonItem === null) {
                            throw new Error(`cannot decode field ${type.typeName}.${field.name} from JSON: ${this.debug(jsonItem)}`);
                        }
                        let val;
                        // eslint-disable-next-line @typescript-eslint/switch-exhaustiveness-check -- "map" is invalid for repeated fields
                        switch (field.kind) {
                            case "message":
                                val = field.T.fromJson(jsonItem, options);
                                break;
                            case "enum":
                                val = readEnum(field.T, jsonItem, options.ignoreUnknownFields);
                                if (val === undefined)
                                    continue;
                                break;
                            case "scalar":
                                try {
                                    val = readScalar(field.T, jsonItem, field.L);
                                }
                                catch (e) {
                                    let m = `cannot decode field ${type.typeName}.${field.name} from JSON: ${this.debug(jsonItem)}`;
                                    if (e instanceof Error && e.message.length > 0) {
                                        m += `: ${e.message}`;
                                    }
                                    throw new Error(m);
                                }
                                break;
                        }
                        targetArray.push(val);
                    }
                }
                else if (field.kind == "map") {
                    if (jsonValue === null) {
                        continue;
                    }
                    if (Array.isArray(jsonValue) || typeof jsonValue != "object") {
                        throw new Error(`cannot decode field ${type.typeName}.${field.name} from JSON: ${this.debug(jsonValue)}`);
                    }
                    const targetMap = target[localName];
                    for (const [jsonMapKey, jsonMapValue] of Object.entries(jsonValue)) {
                        if (jsonMapValue === null) {
                            throw new Error(`cannot decode field ${type.typeName}.${field.name} from JSON: map value null`);
                        }
                        let val;
                        switch (field.V.kind) {
                            case "message":
                                val = field.V.T.fromJson(jsonMapValue, options);
                                break;
                            case "enum":
                                val = readEnum(field.V.T, jsonMapValue, options.ignoreUnknownFields);
                                if (val === undefined)
                                    continue;
                                break;
                            case "scalar":
                                try {
                                    val = readScalar(field.V.T, jsonMapValue, LongType.BIGINT);
                                }
                                catch (e) {
                                    let m = `cannot decode map value for field ${type.typeName}.${field.name} from JSON: ${this.debug(jsonValue)}`;
                                    if (e instanceof Error && e.message.length > 0) {
                                        m += `: ${e.message}`;
                                    }
                                    throw new Error(m);
                                }
                                break;
                        }
                        try {
                            targetMap[readScalar(field.K, field.K == ScalarType.BOOL
                                ? jsonMapKey == "true"
                                    ? true
                                    : jsonMapKey == "false"
                                        ? false
                                        : jsonMapKey
                                : jsonMapKey, LongType.BIGINT).toString()] = val;
                        }
                        catch (e) {
                            let m = `cannot decode map key for field ${type.typeName}.${field.name} from JSON: ${this.debug(jsonValue)}`;
                            if (e instanceof Error && e.message.length > 0) {
                                m += `: ${e.message}`;
                            }
                            throw new Error(m);
                        }
                    }
                }
                else {
                    switch (field.kind) {
                        case "message":
                            const messageType = field.T;
                            if (jsonValue === null &&
                                messageType.typeName != "google.protobuf.Value") {
                                if (field.oneof) {
                                    throw new Error(`cannot decode field ${type.typeName}.${field.name} from JSON: null is invalid for oneof field "${jsonKey}"`);
                                }
                                continue;
                            }
                            if (target[localName] instanceof Message) {
                                target[localName].fromJson(jsonValue, options);
                            }
                            else {
                                target[localName] = messageType.fromJson(jsonValue, options);
                                if (messageType.fieldWrapper && !field.oneof) {
                                    target[localName] = messageType.fieldWrapper.unwrapField(target[localName]);
                                }
                            }
                            break;
                        case "enum":
                            const enumValue = readEnum(field.T, jsonValue, options.ignoreUnknownFields);
                            if (enumValue !== undefined) {
                                target[localName] = enumValue;
                            }
                            break;
                        case "scalar":
                            try {
                                target[localName] = readScalar(field.T, jsonValue, field.L);
                            }
                            catch (e) {
                                let m = `cannot decode field ${type.typeName}.${field.name} from JSON: ${this.debug(jsonValue)}`;
                                if (e instanceof Error && e.message.length > 0) {
                                    m += `: ${e.message}`;
                                }
                                throw new Error(m);
                            }
                            break;
                    }
                }
            }
            return message;
        },
        writeMessage(message, options) {
            const type = message.getType();
            const json = {};
            let field;
            try {
                for (const member of type.fields.byMember()) {
                    let jsonValue;
                    if (member.kind == "oneof") {
                        const oneof = message[member.localName];
                        if (oneof.value === undefined) {
                            continue;
                        }
                        field = member.findField(oneof.case);
                        if (!field) {
                            throw "oneof case not found: " + oneof.case;
                        }
                        jsonValue = writeField(field, oneof.value, options);
                    }
                    else {
                        field = member;
                        jsonValue = writeField(field, message[field.localName], options);
                    }
                    if (jsonValue !== undefined) {
                        json[options.useProtoFieldName ? field.name : field.jsonName] =
                            jsonValue;
                    }
                }
            }
            catch (e) {
                const m = field
                    ? `cannot encode field ${type.typeName}.${field.name} to JSON`
                    : `cannot encode message ${type.typeName} to JSON`;
                const r = e instanceof Error ? e.message : String(e);
                throw new Error(m + (r.length > 0 ? `: ${r}` : ""));
            }
            return json;
        },
        readScalar,
        writeScalar,
        debug: debugJsonValue,
    };
}
function debugJsonValue(json) {
    if (json === null) {
        return "null";
    }
    switch (typeof json) {
        case "object":
            return Array.isArray(json) ? "array" : "object";
        case "string":
            return json.length > 100 ? "string" : `"${json.split('"').join('\\"')}"`;
        default:
            return String(json);
    }
}
// May throw an error. If the error message is non-blank, it should be shown.
// It is up to the caller to provide context.
function readScalar(type, json, longType) {
    // every valid case in the switch below returns, and every fall
    // through is regarded as a failure.
    switch (type) {
        // float, double: JSON value will be a number or one of the special string values "NaN", "Infinity", and "-Infinity".
        // Either numbers or strings are accepted. Exponent notation is also accepted.
        case ScalarType.DOUBLE:
        case ScalarType.FLOAT:
            if (json === null)
                return 0.0;
            if (json === "NaN")
                return Number.NaN;
            if (json === "Infinity")
                return Number.POSITIVE_INFINITY;
            if (json === "-Infinity")
                return Number.NEGATIVE_INFINITY;
            if (json === "") {
                // empty string is not a number
                break;
            }
            if (typeof json == "string" && json.trim().length !== json.length) {
                // extra whitespace
                break;
            }
            if (typeof json != "string" && typeof json != "number") {
                break;
            }
            const float = Number(json);
            if (Number.isNaN(float)) {
                // not a number
                break;
            }
            if (!Number.isFinite(float)) {
                // infinity and -infinity are handled by string representation above, so this is an error
                break;
            }
            if (type == ScalarType.FLOAT)
                assertFloat32(float);
            return float;
        // int32, fixed32, uint32: JSON value will be a decimal number. Either numbers or strings are accepted.
        case ScalarType.INT32:
        case ScalarType.FIXED32:
        case ScalarType.SFIXED32:
        case ScalarType.SINT32:
        case ScalarType.UINT32:
            if (json === null)
                return 0;
            let int32;
            if (typeof json == "number")
                int32 = json;
            else if (typeof json == "string" && json.length > 0) {
                if (json.trim().length === json.length)
                    int32 = Number(json);
            }
            if (int32 === undefined)
                break;
            if (type == ScalarType.UINT32)
                assertUInt32(int32);
            else
                assertInt32(int32);
            return int32;
        // int64, fixed64, uint64: JSON value will be a decimal string. Either numbers or strings are accepted.
        case ScalarType.INT64:
        case ScalarType.SFIXED64:
        case ScalarType.SINT64:
            if (json === null)
                return protoInt64.zero;
            if (typeof json != "number" && typeof json != "string")
                break;
            const long = protoInt64.parse(json);
            // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
            return longType ? long.toString() : long;
        case ScalarType.FIXED64:
        case ScalarType.UINT64:
            if (json === null)
                return protoInt64.zero;
            if (typeof json != "number" && typeof json != "string")
                break;
            const uLong = protoInt64.uParse(json);
            // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
            return longType ? uLong.toString() : uLong;
        // bool:
        case ScalarType.BOOL:
            if (json === null)
                return false;
            if (typeof json !== "boolean")
                break;
            return json;
        // string:
        case ScalarType.STRING:
            if (json === null)
                return "";
            if (typeof json !== "string") {
                break;
            }
            // A string must always contain UTF-8 encoded or 7-bit ASCII.
            // We validate with encodeURIComponent, which appears to be the fastest widely available option.
            try {
                encodeURIComponent(json);
            }
            catch (e) {
                throw new Error("invalid UTF8");
            }
            return json;
        // bytes: JSON value will be the data encoded as a string using standard base64 encoding with paddings.
        // Either standard or URL-safe base64 encoding with/without paddings are accepted.
        case ScalarType.BYTES:
            if (json === null || json === "")
                return new Uint8Array(0);
            if (typeof json !== "string")
                break;
            return protoBase64.dec(json);
    }
    throw new Error();
}
function readEnum(type, json, ignoreUnknownFields) {
    if (json === null) {
        // proto3 requires 0 to be default value for all enums
        return 0;
    }
    // eslint-disable-next-line @typescript-eslint/switch-exhaustiveness-check
    switch (typeof json) {
        case "number":
            if (Number.isInteger(json)) {
                return json;
            }
            break;
        case "string":
            const value = type.findName(json);
            // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
            if (value || ignoreUnknownFields) {
                return value === null || value === void 0 ? void 0 : value.no;
            }
            break;
    }
    throw new Error(`cannot decode enum ${type.typeName} from JSON: ${debugJsonValue(json)}`);
}
function writeEnum(type, value, emitIntrinsicDefault, enumAsInteger) {
    var _a;
    if (value === undefined) {
        return value;
    }
    if (value === 0 && !emitIntrinsicDefault) {
        // proto3 requires 0 to be default value for all enums
        return undefined;
    }
    if (enumAsInteger) {
        return value;
    }
    if (type.typeName == "google.protobuf.NullValue") {
        return null;
    }
    const val = type.findNumber(value);
    return (_a = val === null || val === void 0 ? void 0 : val.name) !== null && _a !== void 0 ? _a : value; // if we don't know the enum value, just return the number
}
function writeScalar(type, value, emitIntrinsicDefault) {
    if (value === undefined) {
        return undefined;
    }
    switch (type) {
        // int32, fixed32, uint32: JSON value will be a decimal number. Either numbers or strings are accepted.
        case ScalarType.INT32:
        case ScalarType.SFIXED32:
        case ScalarType.SINT32:
        case ScalarType.FIXED32:
        case ScalarType.UINT32:
            assert(typeof value == "number");
            return value != 0 || emitIntrinsicDefault ? value : undefined;
        // float, double: JSON value will be a number or one of the special string values "NaN", "Infinity", and "-Infinity".
        // Either numbers or strings are accepted. Exponent notation is also accepted.
        case ScalarType.FLOAT:
        // assertFloat32(value);
        case ScalarType.DOUBLE: // eslint-disable-line no-fallthrough
            assert(typeof value == "number");
            if (Number.isNaN(value))
                return "NaN";
            if (value === Number.POSITIVE_INFINITY)
                return "Infinity";
            if (value === Number.NEGATIVE_INFINITY)
                return "-Infinity";
            return value !== 0 || emitIntrinsicDefault ? value : undefined;
        // string:
        case ScalarType.STRING:
            assert(typeof value == "string");
            return value.length > 0 || emitIntrinsicDefault ? value : undefined;
        // bool:
        case ScalarType.BOOL:
            assert(typeof value == "boolean");
            return value || emitIntrinsicDefault ? value : undefined;
        // JSON value will be a decimal string. Either numbers or strings are accepted.
        case ScalarType.UINT64:
        case ScalarType.FIXED64:
        case ScalarType.INT64:
        case ScalarType.SFIXED64:
        case ScalarType.SINT64:
            assert(typeof value == "bigint" ||
                typeof value == "string" ||
                typeof value == "number");
            // We use implicit conversion with `value != 0` to catch both 0n and "0"
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            return emitIntrinsicDefault || value != 0
                ? value.toString(10)
                : undefined;
        // bytes: JSON value will be the data encoded as a string using standard base64 encoding with paddings.
        // Either standard or URL-safe base64 encoding with/without paddings are accepted.
        case ScalarType.BYTES:
            assert(value instanceof Uint8Array);
            return emitIntrinsicDefault || value.byteLength > 0
                ? protoBase64.enc(value)
                : undefined;
    }
}

// Copyright 2021-2023 Buf Technologies, Inc.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
/* eslint-disable no-case-declarations, @typescript-eslint/restrict-plus-operands,@typescript-eslint/no-explicit-any,@typescript-eslint/no-unsafe-return,@typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-argument */
function makeJsonFormatProto3() {
    return makeJsonFormatCommon((writeEnum, writeScalar) => {
        return function writeField(field, value, options) {
            if (field.kind == "map") {
                const jsonObj = {};
                switch (field.V.kind) {
                    case "scalar":
                        for (const [entryKey, entryValue] of Object.entries(value)) {
                            const val = writeScalar(field.V.T, entryValue, true);
                            assert(val !== undefined);
                            jsonObj[entryKey.toString()] = val; // JSON standard allows only (double quoted) string as property key
                        }
                        break;
                    case "message":
                        for (const [entryKey, entryValue] of Object.entries(value)) {
                            // JSON standard allows only (double quoted) string as property key
                            jsonObj[entryKey.toString()] = entryValue.toJson(options);
                        }
                        break;
                    case "enum":
                        const enumType = field.V.T;
                        for (const [entryKey, entryValue] of Object.entries(value)) {
                            assert(entryValue === undefined || typeof entryValue == "number");
                            const val = writeEnum(enumType, entryValue, true, options.enumAsInteger);
                            assert(val !== undefined);
                            jsonObj[entryKey.toString()] = val; // JSON standard allows only (double quoted) string as property key
                        }
                        break;
                }
                return options.emitDefaultValues || Object.keys(jsonObj).length > 0
                    ? jsonObj
                    : undefined;
            }
            else if (field.repeated) {
                const jsonArr = [];
                switch (field.kind) {
                    case "scalar":
                        for (let i = 0; i < value.length; i++) {
                            jsonArr.push(writeScalar(field.T, value[i], true));
                        }
                        break;
                    case "enum":
                        for (let i = 0; i < value.length; i++) {
                            jsonArr.push(writeEnum(field.T, value[i], true, options.enumAsInteger));
                        }
                        break;
                    case "message":
                        for (let i = 0; i < value.length; i++) {
                            jsonArr.push(wrapField(field.T, value[i]).toJson(options));
                        }
                        break;
                }
                return options.emitDefaultValues || jsonArr.length > 0
                    ? jsonArr
                    : undefined;
            }
            else {
                switch (field.kind) {
                    case "scalar":
                        return writeScalar(field.T, value, !!field.oneof || field.opt || options.emitDefaultValues);
                    case "enum":
                        return writeEnum(field.T, value, !!field.oneof || field.opt || options.emitDefaultValues, options.enumAsInteger);
                    case "message":
                        return value !== undefined
                            ? wrapField(field.T, value).toJson(options)
                            : undefined;
                }
            }
        };
    });
}

// Copyright 2021-2023 Buf Technologies, Inc.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
/* eslint-disable @typescript-eslint/no-explicit-any,@typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-return,@typescript-eslint/no-unsafe-argument,no-case-declarations */
function makeUtilCommon() {
    return {
        setEnumType,
        initPartial(source, target) {
            if (source === undefined) {
                return;
            }
            const type = target.getType();
            for (const member of type.fields.byMember()) {
                const localName = member.localName, t = target, s = source;
                if (s[localName] === undefined) {
                    continue;
                }
                switch (member.kind) {
                    case "oneof":
                        const sk = s[localName].case;
                        if (sk === undefined) {
                            continue;
                        }
                        const sourceField = member.findField(sk);
                        let val = s[localName].value;
                        if (sourceField &&
                            sourceField.kind == "message" &&
                            !(val instanceof sourceField.T)) {
                            val = new sourceField.T(val);
                        }
                        else if (sourceField &&
                            sourceField.kind === "scalar" &&
                            sourceField.T === ScalarType.BYTES) {
                            val = toU8Arr(val);
                        }
                        t[localName] = { case: sk, value: val };
                        break;
                    case "scalar":
                    case "enum":
                        let copy = s[localName];
                        if (member.T === ScalarType.BYTES) {
                            copy = member.repeated
                                ? copy.map(toU8Arr)
                                : toU8Arr(copy);
                        }
                        t[localName] = copy;
                        break;
                    case "map":
                        switch (member.V.kind) {
                            case "scalar":
                            case "enum":
                                if (member.V.T === ScalarType.BYTES) {
                                    for (const [k, v] of Object.entries(s[localName])) {
                                        t[localName][k] = toU8Arr(v);
                                    }
                                }
                                else {
                                    Object.assign(t[localName], s[localName]);
                                }
                                break;
                            case "message":
                                const messageType = member.V.T;
                                for (const k of Object.keys(s[localName])) {
                                    let val = s[localName][k];
                                    if (!messageType.fieldWrapper) {
                                        // We only take partial input for messages that are not a wrapper type.
                                        // For those messages, we recursively normalize the partial input.
                                        val = new messageType(val);
                                    }
                                    t[localName][k] = val;
                                }
                                break;
                        }
                        break;
                    case "message":
                        const mt = member.T;
                        if (member.repeated) {
                            t[localName] = s[localName].map((val) => val instanceof mt ? val : new mt(val));
                        }
                        else if (s[localName] !== undefined) {
                            const val = s[localName];
                            if (mt.fieldWrapper) {
                                if (
                                // We can't use BytesValue.typeName as that will create a circular import
                                mt.typeName === "google.protobuf.BytesValue") {
                                    t[localName] = toU8Arr(val);
                                }
                                else {
                                    t[localName] = val;
                                }
                            }
                            else {
                                t[localName] = val instanceof mt ? val : new mt(val);
                            }
                        }
                        break;
                }
            }
        },
        equals(type, a, b) {
            if (a === b) {
                return true;
            }
            if (!a || !b) {
                return false;
            }
            return type.fields.byMember().every((m) => {
                const va = a[m.localName];
                const vb = b[m.localName];
                if (m.repeated) {
                    if (va.length !== vb.length) {
                        return false;
                    }
                    // eslint-disable-next-line @typescript-eslint/switch-exhaustiveness-check -- repeated fields are never "map"
                    switch (m.kind) {
                        case "message":
                            return va.every((a, i) => m.T.equals(a, vb[i]));
                        case "scalar":
                            return va.every((a, i) => scalarEquals(m.T, a, vb[i]));
                        case "enum":
                            return va.every((a, i) => scalarEquals(ScalarType.INT32, a, vb[i]));
                    }
                    throw new Error(`repeated cannot contain ${m.kind}`);
                }
                switch (m.kind) {
                    case "message":
                        return m.T.equals(va, vb);
                    case "enum":
                        return scalarEquals(ScalarType.INT32, va, vb);
                    case "scalar":
                        return scalarEquals(m.T, va, vb);
                    case "oneof":
                        if (va.case !== vb.case) {
                            return false;
                        }
                        const s = m.findField(va.case);
                        if (s === undefined) {
                            return true;
                        }
                        // eslint-disable-next-line @typescript-eslint/switch-exhaustiveness-check -- oneof fields are never "map"
                        switch (s.kind) {
                            case "message":
                                return s.T.equals(va.value, vb.value);
                            case "enum":
                                return scalarEquals(ScalarType.INT32, va.value, vb.value);
                            case "scalar":
                                return scalarEquals(s.T, va.value, vb.value);
                        }
                        throw new Error(`oneof cannot contain ${s.kind}`);
                    case "map":
                        const keys = Object.keys(va).concat(Object.keys(vb));
                        switch (m.V.kind) {
                            case "message":
                                const messageType = m.V.T;
                                return keys.every((k) => messageType.equals(va[k], vb[k]));
                            case "enum":
                                return keys.every((k) => scalarEquals(ScalarType.INT32, va[k], vb[k]));
                            case "scalar":
                                const scalarType = m.V.T;
                                return keys.every((k) => scalarEquals(scalarType, va[k], vb[k]));
                        }
                        break;
                }
            });
        },
        clone(message) {
            const type = message.getType(), target = new type(), any = target;
            for (const member of type.fields.byMember()) {
                const source = message[member.localName];
                let copy;
                if (member.repeated) {
                    copy = source.map(cloneSingularField);
                }
                else if (member.kind == "map") {
                    copy = any[member.localName];
                    for (const [key, v] of Object.entries(source)) {
                        copy[key] = cloneSingularField(v);
                    }
                }
                else if (member.kind == "oneof") {
                    const f = member.findField(source.case);
                    copy = f
                        ? { case: source.case, value: cloneSingularField(source.value) }
                        : { case: undefined };
                }
                else {
                    copy = cloneSingularField(source);
                }
                any[member.localName] = copy;
            }
            return target;
        },
    };
}
// clone a single field value - i.e. the element type of repeated fields, the value type of maps
function cloneSingularField(value) {
    if (value === undefined) {
        return value;
    }
    if (value instanceof Message) {
        return value.clone();
    }
    if (value instanceof Uint8Array) {
        const c = new Uint8Array(value.byteLength);
        c.set(value);
        return c;
    }
    return value;
}
// converts any ArrayLike<number> to Uint8Array if necessary.
function toU8Arr(input) {
    return input instanceof Uint8Array ? input : new Uint8Array(input);
}

// Copyright 2021-2023 Buf Technologies, Inc.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
class InternalFieldList {
    constructor(fields, normalizer) {
        this._fields = fields;
        this._normalizer = normalizer;
    }
    findJsonName(jsonName) {
        if (!this.jsonNames) {
            const t = {};
            for (const f of this.list()) {
                t[f.jsonName] = t[f.name] = f;
            }
            this.jsonNames = t;
        }
        return this.jsonNames[jsonName];
    }
    find(fieldNo) {
        if (!this.numbers) {
            const t = {};
            for (const f of this.list()) {
                t[f.no] = f;
            }
            this.numbers = t;
        }
        return this.numbers[fieldNo];
    }
    list() {
        if (!this.all) {
            this.all = this._normalizer(this._fields);
        }
        return this.all;
    }
    byNumber() {
        if (!this.numbersAsc) {
            this.numbersAsc = this.list()
                .concat()
                .sort((a, b) => a.no - b.no);
        }
        return this.numbersAsc;
    }
    byMember() {
        if (!this.members) {
            this.members = [];
            const a = this.members;
            let o;
            for (const f of this.list()) {
                if (f.oneof) {
                    if (f.oneof !== o) {
                        o = f.oneof;
                        a.push(o);
                    }
                }
                else {
                    a.push(f);
                }
            }
        }
        return this.members;
    }
}

// Copyright 2021-2023 Buf Technologies, Inc.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
/**
 * Returns the name of a protobuf element in generated code.
 *
 * Field names - including oneofs - are converted to lowerCamelCase. For
 * messages, enumerations and services, the package name is stripped from
 * the type name. For nested messages and enumerations, the names are joined
 * with an underscore. For methods, the first character is made lowercase.
 */
/**
 * Returns the name of a field in generated code.
 */
function localFieldName(protoName, inOneof) {
    const name = protoCamelCase(protoName);
    if (inOneof) {
        // oneof member names are not properties, but values of the `case` property.
        return name;
    }
    return safeObjectProperty(safeMessageProperty(name));
}
/**
 * Returns the name of a oneof group in generated code.
 */
function localOneofName(protoName) {
    return localFieldName(protoName, false);
}
/**
 * Returns the JSON name for a protobuf field, exactly like protoc does.
 */
const fieldJsonName = protoCamelCase;
/**
 * Converts snake_case to protoCamelCase according to the convention
 * used by protoc to convert a field name to a JSON name.
 */
function protoCamelCase(snakeCase) {
    let capNext = false;
    const b = [];
    for (let i = 0; i < snakeCase.length; i++) {
        let c = snakeCase.charAt(i);
        switch (c) {
            case "_":
                capNext = true;
                break;
            case "0":
            case "1":
            case "2":
            case "3":
            case "4":
            case "5":
            case "6":
            case "7":
            case "8":
            case "9":
                b.push(c);
                capNext = false;
                break;
            default:
                if (capNext) {
                    capNext = false;
                    c = c.toUpperCase();
                }
                b.push(c);
                break;
        }
    }
    return b.join("");
}
/**
 * Names that cannot be used for object properties because they are reserved
 * by built-in JavaScript properties.
 */
const reservedObjectProperties = new Set([
    // names reserved by JavaScript
    "constructor",
    "toString",
    "toJSON",
    "valueOf",
]);
/**
 * Names that cannot be used for object properties because they are reserved
 * by the runtime.
 */
const reservedMessageProperties = new Set([
    // names reserved by the runtime
    "getType",
    "clone",
    "equals",
    "fromBinary",
    "fromJson",
    "fromJsonString",
    "toBinary",
    "toJson",
    "toJsonString",
    // names reserved by the runtime for the future
    "toObject",
]);
const fallback = (name) => `${name}$`;
/**
 * Will wrap names that are Object prototype properties or names reserved
 * for `Message`s.
 */
const safeMessageProperty = (name) => {
    if (reservedMessageProperties.has(name)) {
        return fallback(name);
    }
    return name;
};
/**
 * Names that cannot be used for object properties because they are reserved
 * by built-in JavaScript properties.
 */
const safeObjectProperty = (name) => {
    if (reservedObjectProperties.has(name)) {
        return fallback(name);
    }
    return name;
};

// Copyright 2021-2023 Buf Technologies, Inc.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
class InternalOneofInfo {
    constructor(name) {
        this.kind = "oneof";
        this.repeated = false;
        this.packed = false;
        this.opt = false;
        this.default = undefined;
        this.fields = [];
        this.name = name;
        this.localName = localOneofName(name);
    }
    addField(field) {
        assert(field.oneof === this, `field ${field.name} not one of ${this.name}`);
        this.fields.push(field);
    }
    findField(localName) {
        if (!this._lookup) {
            this._lookup = Object.create(null);
            for (let i = 0; i < this.fields.length; i++) {
                this._lookup[this.fields[i].localName] = this.fields[i];
            }
        }
        return this._lookup[localName];
    }
}

// Copyright 2021-2023 Buf Technologies, Inc.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
/**
 * Provides functionality for messages defined with the proto3 syntax.
 */
const proto3 = makeProtoRuntime("proto3", makeJsonFormatProto3(), makeBinaryFormatProto3(), Object.assign(Object.assign({}, makeUtilCommon()), { newFieldList(fields) {
        return new InternalFieldList(fields, normalizeFieldInfosProto3);
    },
    initFields(target) {
        for (const member of target.getType().fields.byMember()) {
            if (member.opt) {
                continue;
            }
            const name = member.localName, t = target;
            if (member.repeated) {
                t[name] = [];
                continue;
            }
            switch (member.kind) {
                case "oneof":
                    t[name] = { case: undefined };
                    break;
                case "enum":
                    t[name] = 0;
                    break;
                case "map":
                    t[name] = {};
                    break;
                case "scalar":
                    t[name] = scalarDefaultValue(member.T, member.L); // eslint-disable-line @typescript-eslint/no-unsafe-assignment
                    break;
            }
        }
    } }));
/* eslint-disable @typescript-eslint/no-explicit-any,@typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-argument */
function normalizeFieldInfosProto3(fieldInfos) {
    var _a, _b, _c, _d;
    const r = [];
    let o;
    for (const field of typeof fieldInfos == "function"
        ? fieldInfos()
        : fieldInfos) {
        const f = field;
        f.localName = localFieldName(field.name, field.oneof !== undefined);
        f.jsonName = (_a = field.jsonName) !== null && _a !== void 0 ? _a : fieldJsonName(field.name);
        f.repeated = (_b = field.repeated) !== null && _b !== void 0 ? _b : false;
        if (field.kind == "scalar") {
            f.L = (_c = field.L) !== null && _c !== void 0 ? _c : LongType.BIGINT;
        }
        // From the proto3 language guide:
        // > In proto3, repeated fields of scalar numeric types are packed by default.
        // This information is incomplete - according to the conformance tests, BOOL
        // and ENUM are packed by default as well. This means only STRING and BYTES
        // are not packed by default, which makes sense because they are length-delimited.
        f.packed =
            (_d = field.packed) !== null && _d !== void 0 ? _d : (field.kind == "enum" ||
                (field.kind == "scalar" &&
                    field.T != ScalarType.BYTES &&
                    field.T != ScalarType.STRING));
        // We do not surface options at this time
        // f.options = field.options ?? emptyReadonlyObject;
        if (field.oneof !== undefined) {
            const ooname = typeof field.oneof == "string" ? field.oneof : field.oneof.name;
            if (!o || o.name != ooname) {
                o = new InternalOneofInfo(ooname);
            }
            f.oneof = o;
            o.addField(f);
        }
        r.push(f);
    }
    return r;
}

// Copyright 2021-2023 Buf Technologies, Inc.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
/**
 * MethodKind represents the four method types that can be declared in
 * protobuf with the `stream` keyword:
 *
 * 1. Unary:           rpc (Input) returns (Output)
 * 2. ServerStreaming: rpc (Input) returns (stream Output)
 * 3. ClientStreaming: rpc (stream Input) returns (Output)
 * 4. BiDiStreaming:   rpc (stream Input) returns (stream Output)
 */
var MethodKind;
(function (MethodKind) {
    MethodKind[MethodKind["Unary"] = 0] = "Unary";
    MethodKind[MethodKind["ServerStreaming"] = 1] = "ServerStreaming";
    MethodKind[MethodKind["ClientStreaming"] = 2] = "ClientStreaming";
    MethodKind[MethodKind["BiDiStreaming"] = 3] = "BiDiStreaming";
})(MethodKind || (MethodKind = {}));
/**
 * Is this method side-effect-free (or safe in HTTP parlance), or just
 * idempotent, or neither? HTTP based RPC implementation may choose GET verb
 * for safe methods, and PUT verb for idempotent methods instead of the
 * default POST.
 *
 * This enum matches the protobuf enum google.protobuf.MethodOptions.IdempotencyLevel,
 * defined in the well-known type google/protobuf/descriptor.proto, but
 * drops UNKNOWN.
 */
var MethodIdempotency;
(function (MethodIdempotency) {
    /**
     * Idempotent, no side effects.
     */
    MethodIdempotency[MethodIdempotency["NoSideEffects"] = 1] = "NoSideEffects";
    /**
     * Idempotent, but may have side effects.
     */
    MethodIdempotency[MethodIdempotency["Idempotent"] = 2] = "Idempotent";
})(MethodIdempotency || (MethodIdempotency = {}));

// Copyright 2021-2023 The Connect Authors
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
/**
 * Connect represents categories of errors as codes, and each code maps to a
 * specific HTTP status code. The codes and their semantics were chosen to
 * match gRPC. Only the codes below are valid — there are no user-defined
 * codes.
 *
 * See the specification at https://connectrpc.com/docs/protocol#error-codes
 * for details.
 */
var Code;
(function (Code) {
    /**
     * Canceled, usually be the user
     */
    Code[Code["Canceled"] = 1] = "Canceled";
    /**
     * Unknown error
     */
    Code[Code["Unknown"] = 2] = "Unknown";
    /**
     * Argument invalid regardless of system state
     */
    Code[Code["InvalidArgument"] = 3] = "InvalidArgument";
    /**
     * Operation expired, may or may not have completed.
     */
    Code[Code["DeadlineExceeded"] = 4] = "DeadlineExceeded";
    /**
     * Entity not found.
     */
    Code[Code["NotFound"] = 5] = "NotFound";
    /**
     * Entity already exists.
     */
    Code[Code["AlreadyExists"] = 6] = "AlreadyExists";
    /**
     * Operation not authorized.
     */
    Code[Code["PermissionDenied"] = 7] = "PermissionDenied";
    /**
     * Quota exhausted.
     */
    Code[Code["ResourceExhausted"] = 8] = "ResourceExhausted";
    /**
     * Argument invalid in current system state.
     */
    Code[Code["FailedPrecondition"] = 9] = "FailedPrecondition";
    /**
     * Operation aborted.
     */
    Code[Code["Aborted"] = 10] = "Aborted";
    /**
     * Out of bounds, use instead of FailedPrecondition.
     */
    Code[Code["OutOfRange"] = 11] = "OutOfRange";
    /**
     * Operation not implemented or disabled.
     */
    Code[Code["Unimplemented"] = 12] = "Unimplemented";
    /**
     * Internal error, reserved for "serious errors".
     */
    Code[Code["Internal"] = 13] = "Internal";
    /**
     * Unavailable, client should back off and retry.
     */
    Code[Code["Unavailable"] = 14] = "Unavailable";
    /**
     * Unrecoverable data loss or corruption.
     */
    Code[Code["DataLoss"] = 15] = "DataLoss";
    /**
     * Request isn't authenticated.
     */
    Code[Code["Unauthenticated"] = 16] = "Unauthenticated";
})(Code || (Code = {}));

// Copyright 2021-2023 The Connect Authors
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
/**
 * codeToString returns the string representation of a Code.
 *
 * @private Internal code, does not follow semantic versioning.
 */
function codeToString(value) {
    const name = Code[value];
    if (typeof name != "string") {
        return value.toString();
    }
    return (name[0].toLowerCase() +
        name.substring(1).replace(/[A-Z]/g, (c) => "_" + c.toLowerCase()));
}
let stringToCode;
/**
 * codeFromString parses the string representation of a Code in snake_case.
 * For example, the string "permission_denied" parses into Code.PermissionDenied.
 *
 * If the given string cannot be parsed, the function returns undefined.
 *
 * @private Internal code, does not follow semantic versioning.
 */
function codeFromString(value) {
    if (!stringToCode) {
        stringToCode = {};
        for (const value of Object.values(Code)) {
            if (typeof value == "string") {
                continue;
            }
            stringToCode[codeToString(value)] = value;
        }
    }
    return stringToCode[value];
}

// Copyright 2021-2023 The Connect Authors
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
/**
 * ConnectError captures four pieces of information: a Code, an error
 * message, an optional cause of the error, and an optional collection of
 * arbitrary Protobuf messages called  "details".
 *
 * Because developer tools typically show just the error message, we prefix
 * it with the status code, so that the most important information is always
 * visible immediately.
 *
 * Error details are wrapped with google.protobuf.Any on the wire, so that
 * a server or middleware can attach arbitrary data to an error. Use the
 * method findDetails() to retrieve the details.
 */
class ConnectError extends Error {
    /**
     * Create a new ConnectError.
     * If no code is provided, code "unknown" is used.
     * Outgoing details are only relevant for the server side - a service may
     * raise an error with details, and it is up to the protocol implementation
     * to encode and send the details along with error.
     */
    constructor(message, code = Code.Unknown, metadata, outgoingDetails, cause) {
        super(createMessage(message, code));
        this.name = "ConnectError";
        // see https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-2.html#example
        Object.setPrototypeOf(this, new.target.prototype);
        this.rawMessage = message;
        this.code = code;
        this.metadata = new Headers(metadata !== null && metadata !== void 0 ? metadata : {});
        this.details = outgoingDetails !== null && outgoingDetails !== void 0 ? outgoingDetails : [];
        this.cause = cause;
    }
    /**
     * Convert any value - typically a caught error into a ConnectError,
     * following these rules:
     * - If the value is already a ConnectError, return it as is.
     * - If the value is an AbortError from the fetch API, return the message
     *   of the AbortError with code Canceled.
     * - For other Errors, return the error message with code Unknown by default.
     * - For other values, return the values String representation as a message,
     *   with the code Unknown by default.
     * The original value will be used for the "cause" property for the new
     * ConnectError.
     */
    static from(reason, code = Code.Unknown) {
        if (reason instanceof ConnectError) {
            return reason;
        }
        if (reason instanceof Error) {
            if (reason.name == "AbortError") {
                // Fetch requests can only be canceled with an AbortController.
                // We detect that condition by looking at the name of the raised
                // error object, and translate to the appropriate status code.
                return new ConnectError(reason.message, Code.Canceled);
            }
            return new ConnectError(reason.message, code, undefined, undefined, reason);
        }
        return new ConnectError(String(reason), code, undefined, undefined, reason);
    }
    findDetails(typeOrRegistry) {
        const registry = "typeName" in typeOrRegistry
            ? {
                findMessage: (typeName) => typeName === typeOrRegistry.typeName ? typeOrRegistry : undefined,
            }
            : typeOrRegistry;
        const details = [];
        for (const data of this.details) {
            if (data instanceof Message) {
                if (registry.findMessage(data.getType().typeName)) {
                    details.push(data);
                }
                continue;
            }
            const type = registry.findMessage(data.type);
            if (type) {
                try {
                    details.push(type.fromBinary(data.value));
                }
                catch (_) {
                    // We silently give up if we are unable to parse the detail, because
                    // that appears to be the least worst behavior.
                    // It is very unlikely that a user surrounds a catch body handling the
                    // error with another try-catch statement, and we do not want to
                    // recommend doing so.
                }
            }
        }
        return details;
    }
}
/**
 * Create an error message, prefixing the given code.
 */
function createMessage(message, code) {
    return message.length
        ? `[${codeToString(code)}] ${message}`
        : `[${codeToString(code)}]`;
}

// Copyright 2021-2023 The Connect Authors
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
/**
 * Merge two or more Headers objects by appending all fields from
 * all inputs to a new Headers object.
 */
function appendHeaders(...headers) {
    const h = new Headers();
    for (const e of headers) {
        e.forEach((value, key) => {
            h.append(key, value);
        });
    }
    return h;
}

// Copyright 2021-2023 The Connect Authors
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
/**
 * Create any client for the given service.
 *
 * The given createMethod function is called for each method definition
 * of the service. The function it returns is added to the client object
 * as a method.
 */
function makeAnyClient(service, createMethod) {
    const client = {};
    for (const [localName, methodInfo] of Object.entries(service.methods)) {
        const method = createMethod(Object.assign(Object.assign({}, methodInfo), { localName,
            service }));
        if (method != null) {
            client[localName] = method;
        }
    }
    return client;
}

// Copyright 2021-2023 The Connect Authors
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
/**
 * Create a WHATWG ReadableStream of enveloped messages from a ReadableStream
 * of bytes.
 *
 * Ideally, this would simply be a TransformStream, but ReadableStream.pipeThrough
 * does not have the necessary availability at this time.
 *
 * @private Internal code, does not follow semantic versioning.
 */
function createEnvelopeReadableStream(stream) {
    let reader;
    let buffer = new Uint8Array(0);
    function append(chunk) {
        const n = new Uint8Array(buffer.length + chunk.length);
        n.set(buffer);
        n.set(chunk, buffer.length);
        buffer = n;
    }
    return new ReadableStream({
        start() {
            reader = stream.getReader();
        },
        async pull(controller) {
            let header = undefined;
            for (;;) {
                if (header === undefined && buffer.byteLength >= 5) {
                    let length = 0;
                    for (let i = 1; i < 5; i++) {
                        length = (length << 8) + buffer[i];
                    }
                    header = { flags: buffer[0], length };
                }
                if (header !== undefined && buffer.byteLength >= header.length + 5) {
                    break;
                }
                const result = await reader.read();
                if (result.done) {
                    break;
                }
                append(result.value);
            }
            if (header === undefined) {
                if (buffer.byteLength == 0) {
                    controller.close();
                    return;
                }
                controller.error(new ConnectError("premature end of stream", Code.DataLoss));
                return;
            }
            const data = buffer.subarray(5, 5 + header.length);
            buffer = buffer.subarray(5 + header.length);
            controller.enqueue({
                flags: header.flags,
                data,
            });
        },
    });
}
/**
 * Encode a single enveloped message.
 *
 * @private Internal code, does not follow semantic versioning.
 */
function encodeEnvelope(flags, data) {
    const bytes = new Uint8Array(data.length + 5);
    bytes.set(data, 5);
    const v = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
    v.setUint8(0, flags); // first byte is flags
    v.setUint32(1, data.length); // 4 bytes message length
    return bytes;
}

// Copyright 2021-2023 The Connect Authors
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
var __asyncValues$1 = (undefined && undefined.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
var __await$2 = (undefined && undefined.__await) || function (v) { return this instanceof __await$2 ? (this.v = v, this) : new __await$2(v); };
var __asyncGenerator$2 = (undefined && undefined.__asyncGenerator) || function (thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
    function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
    function step(r) { r.value instanceof __await$2 ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
    function fulfill(value) { resume("next", value); }
    function reject(value) { resume("throw", value); }
    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
};
var __asyncDelegator$1 = (undefined && undefined.__asyncDelegator) || function (o) {
    var i, p;
    return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
    function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await$2(o[n](v)), done: false } : f ? f(v) : v; } : f; }
};
/**
 * Create an asynchronous iterable from an array.
 *
 * @private Internal code, does not follow semantic versioning.
 */
// eslint-disable-next-line @typescript-eslint/require-await
function createAsyncIterable(items) {
    return __asyncGenerator$2(this, arguments, function* createAsyncIterable_1() {
        yield __await$2(yield* __asyncDelegator$1(__asyncValues$1(items)));
    });
}

// Copyright 2021-2023 The Connect Authors
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
var __asyncValues = (undefined && undefined.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
var __await$1 = (undefined && undefined.__await) || function (v) { return this instanceof __await$1 ? (this.v = v, this) : new __await$1(v); };
var __asyncDelegator = (undefined && undefined.__asyncDelegator) || function (o) {
    var i, p;
    return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
    function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await$1(o[n](v)), done: false } : f ? f(v) : v; } : f; }
};
var __asyncGenerator$1 = (undefined && undefined.__asyncGenerator) || function (thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
    function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
    function step(r) { r.value instanceof __await$1 ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
    function fulfill(value) { resume("next", value); }
    function reject(value) { resume("throw", value); }
    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
};
/**
 * Create a PromiseClient for the given service, invoking RPCs through the
 * given transport.
 */
function createPromiseClient(service, transport) {
    return makeAnyClient(service, (method) => {
        switch (method.kind) {
            case MethodKind.Unary:
                return createUnaryFn(transport, service, method);
            case MethodKind.ServerStreaming:
                return createServerStreamingFn(transport, service, method);
            case MethodKind.ClientStreaming:
                return createClientStreamingFn(transport, service, method);
            case MethodKind.BiDiStreaming:
                return createBiDiStreamingFn(transport, service, method);
            default:
                return null;
        }
    });
}
function createUnaryFn(transport, service, method) {
    return async function (input, options) {
        var _a, _b;
        const response = await transport.unary(service, method, options === null || options === void 0 ? void 0 : options.signal, options === null || options === void 0 ? void 0 : options.timeoutMs, options === null || options === void 0 ? void 0 : options.headers, input, options === null || options === void 0 ? void 0 : options.contextValues);
        (_a = options === null || options === void 0 ? void 0 : options.onHeader) === null || _a === void 0 ? void 0 : _a.call(options, response.header);
        (_b = options === null || options === void 0 ? void 0 : options.onTrailer) === null || _b === void 0 ? void 0 : _b.call(options, response.trailer);
        return response.message;
    };
}
function createServerStreamingFn(transport, service, method) {
    return function (input, options) {
        return handleStreamResponse(transport.stream(service, method, options === null || options === void 0 ? void 0 : options.signal, options === null || options === void 0 ? void 0 : options.timeoutMs, options === null || options === void 0 ? void 0 : options.headers, createAsyncIterable([input]), options === null || options === void 0 ? void 0 : options.contextValues), options);
    };
}
function createClientStreamingFn(transport, service, method) {
    return async function (request, options) {
        var _a, e_1, _b, _c;
        var _d, _e;
        const response = await transport.stream(service, method, options === null || options === void 0 ? void 0 : options.signal, options === null || options === void 0 ? void 0 : options.timeoutMs, options === null || options === void 0 ? void 0 : options.headers, request, options === null || options === void 0 ? void 0 : options.contextValues);
        (_d = options === null || options === void 0 ? void 0 : options.onHeader) === null || _d === void 0 ? void 0 : _d.call(options, response.header);
        let singleMessage;
        try {
            for (var _f = true, _g = __asyncValues(response.message), _h; _h = await _g.next(), _a = _h.done, !_a; _f = true) {
                _c = _h.value;
                _f = false;
                const message = _c;
                singleMessage = message;
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (!_f && !_a && (_b = _g.return)) await _b.call(_g);
            }
            finally { if (e_1) throw e_1.error; }
        }
        if (!singleMessage) {
            throw new ConnectError("protocol error: missing response message", Code.Internal);
        }
        (_e = options === null || options === void 0 ? void 0 : options.onTrailer) === null || _e === void 0 ? void 0 : _e.call(options, response.trailer);
        return singleMessage;
    };
}
function createBiDiStreamingFn(transport, service, method) {
    return function (request, options) {
        return handleStreamResponse(transport.stream(service, method, options === null || options === void 0 ? void 0 : options.signal, options === null || options === void 0 ? void 0 : options.timeoutMs, options === null || options === void 0 ? void 0 : options.headers, request, options === null || options === void 0 ? void 0 : options.contextValues), options);
    };
}
function handleStreamResponse(stream, options) {
    const it = (function () {
        var _a, _b;
        return __asyncGenerator$1(this, arguments, function* () {
            const response = yield __await$1(stream);
            (_a = options === null || options === void 0 ? void 0 : options.onHeader) === null || _a === void 0 ? void 0 : _a.call(options, response.header);
            yield __await$1(yield* __asyncDelegator(__asyncValues(response.message)));
            (_b = options === null || options === void 0 ? void 0 : options.onTrailer) === null || _b === void 0 ? void 0 : _b.call(options, response.trailer);
        });
    })()[Symbol.asyncIterator]();
    // Create a new iterable to omit throw/return.
    return {
        [Symbol.asyncIterator]: () => ({
            next: () => it.next(),
        }),
    };
}

// Copyright 2021-2023 The Connect Authors
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
/**
 * Create an AbortController that is automatically aborted if one of the given
 * signals is aborted.
 *
 * For convenience, the linked AbortSignals can be undefined.
 *
 * If the controller or any of the signals is aborted, all event listeners are
 * removed.
 *
 * @private Internal code, does not follow semantic versioning.
 */
function createLinkedAbortController(...signals) {
    const controller = new AbortController();
    const sa = signals
        .filter((s) => s !== undefined)
        .concat(controller.signal);
    for (const signal of sa) {
        if (signal.aborted) {
            onAbort.apply(signal);
            break;
        }
        signal.addEventListener("abort", onAbort);
    }
    function onAbort() {
        if (!controller.signal.aborted) {
            controller.abort(getAbortSignalReason(this));
        }
        for (const signal of sa) {
            signal.removeEventListener("abort", onAbort);
        }
    }
    return controller;
}
/**
 * Create a deadline signal. The returned object contains an AbortSignal, but
 * also a cleanup function to stop the timer, which must be called once the
 * calling code is no longer interested in the signal.
 *
 * Ideally, we would simply use AbortSignal.timeout(), but it is not widely
 * available yet.
 *
 * @private Internal code, does not follow semantic versioning.
 */
function createDeadlineSignal(timeoutMs) {
    const controller = new AbortController();
    const listener = () => {
        controller.abort(new ConnectError("the operation timed out", Code.DeadlineExceeded));
    };
    let timeoutId;
    if (timeoutMs !== undefined) {
        if (timeoutMs <= 0)
            listener();
        else
            timeoutId = setTimeout(listener, timeoutMs);
    }
    return {
        signal: controller.signal,
        cleanup: () => clearTimeout(timeoutId),
    };
}
/**
 * Returns the reason why an AbortSignal was aborted. Returns undefined if the
 * signal has not been aborted.
 *
 * The property AbortSignal.reason is not widely available. This function
 * returns an AbortError if the signal is aborted, but reason is undefined.
 *
 * @private Internal code, does not follow semantic versioning.
 */
function getAbortSignalReason(signal) {
    if (!signal.aborted) {
        return undefined;
    }
    if (signal.reason !== undefined) {
        return signal.reason;
    }
    // AbortSignal.reason is available in Node.js v16, v18, and later,
    // and in all browsers since early 2022.
    const e = new Error("This operation was aborted");
    e.name = "AbortError";
    return e;
}

// Copyright 2021-2023 The Connect Authors
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
/**
 * createContextValues creates a new ContextValues.
 */
function createContextValues() {
    return {
        get(key) {
            return key.id in this ? this[key.id] : key.defaultValue;
        },
        set(key, value) {
            this[key.id] = value;
            return this;
        },
        delete(key) {
            delete this[key.id];
            return this;
        },
    };
}

// Copyright 2021-2023 The Connect Authors
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
/**
 * Create a URL for the given RPC. This simply adds the qualified
 * service name, a slash, and the method name to the path of the given
 * baseUrl.
 *
 * For example, the baseUri https://example.com and method "Say" from
 * the service example.ElizaService results in:
 * https://example.com/example.ElizaService/Say
 *
 * This format is used by the protocols Connect, gRPC and Twirp.
 *
 * Note that this function also accepts a protocol-relative baseUrl.
 * If given an empty string or "/" as a baseUrl, it returns just the
 * path.
 */
function createMethodUrl(baseUrl, service, method) {
    const s = typeof service == "string" ? service : service.typeName;
    const m = typeof method == "string" ? method : method.name;
    return baseUrl.toString().replace(/\/?$/, `/${s}/${m}`);
}

// Copyright 2021-2023 The Connect Authors
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
/**
 *  Takes a partial protobuf messages of the
 *  specified message type as input, and returns full instances.
 */
function normalize(type, message) {
    return message instanceof Message ? message : new type(message);
}
/**
 * Takes an AsyncIterable of partial protobuf messages of the
 * specified message type as input, and yields full instances.
 */
function normalizeIterable(messageType, input) {
    function transform(result) {
        if (result.done === true) {
            return result;
        }
        return {
            done: result.done,
            value: normalize(messageType, result.value),
        };
    }
    return {
        [Symbol.asyncIterator]() {
            const it = input[Symbol.asyncIterator]();
            const res = {
                next: () => it.next().then(transform),
            };
            if (it.throw !== undefined) {
                res.throw = (e) => it.throw(e).then(transform); // eslint-disable-line @typescript-eslint/no-non-null-assertion
            }
            if (it.return !== undefined) {
                res.return = (v) => it.return(v).then(transform); // eslint-disable-line @typescript-eslint/no-non-null-assertion
            }
            return res;
        },
    };
}

// Copyright 2021-2023 The Connect Authors
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
/**
 * Sets default JSON serialization options for connect-es.
 *
 * With standard protobuf JSON serialization, unknown JSON fields are
 * rejected by default. In connect-es, unknown JSON fields are ignored
 * by default.
 */
function getJsonOptions(options) {
    var _a;
    const o = Object.assign({}, options);
    (_a = o.ignoreUnknownFields) !== null && _a !== void 0 ? _a : (o.ignoreUnknownFields = true);
    return o;
}
/**
 * Returns functions to normalize and serialize the input message
 * of an RPC, and to parse the output message of an RPC.
 *
 * @private Internal code, does not follow semantic versioning.
 */
function createClientMethodSerializers(method, useBinaryFormat, jsonOptions, binaryOptions) {
    const input = useBinaryFormat
        ? createBinarySerialization(method.I, binaryOptions)
        : createJsonSerialization(method.I, jsonOptions);
    const output = useBinaryFormat
        ? createBinarySerialization(method.O, binaryOptions)
        : createJsonSerialization(method.O, jsonOptions);
    return { parse: output.parse, serialize: input.serialize };
}
/**
 * Creates a Serialization object for serializing the given protobuf message
 * with the protobuf binary format.
 */
function createBinarySerialization(messageType, options) {
    return {
        parse(data) {
            try {
                return messageType.fromBinary(data, options);
            }
            catch (e) {
                const m = e instanceof Error ? e.message : String(e);
                throw new ConnectError(`parse binary: ${m}`, Code.InvalidArgument);
            }
        },
        serialize(data) {
            try {
                return data.toBinary(options);
            }
            catch (e) {
                const m = e instanceof Error ? e.message : String(e);
                throw new ConnectError(`serialize binary: ${m}`, Code.Internal);
            }
        },
    };
}
/**
 * Creates a Serialization object for serializing the given protobuf message
 * with the protobuf canonical JSON encoding.
 *
 * By default, unknown fields are ignored.
 */
function createJsonSerialization(messageType, options) {
    var _a, _b;
    const textEncoder = (_a = options === null || options === void 0 ? void 0 : options.textEncoder) !== null && _a !== void 0 ? _a : new TextEncoder();
    const textDecoder = (_b = options === null || options === void 0 ? void 0 : options.textDecoder) !== null && _b !== void 0 ? _b : new TextDecoder();
    const o = getJsonOptions(options);
    return {
        parse(data) {
            try {
                const json = textDecoder.decode(data);
                return messageType.fromJsonString(json, o);
            }
            catch (e) {
                throw ConnectError.from(e, Code.InvalidArgument);
            }
        },
        serialize(data) {
            try {
                const json = data.toJsonString(o);
                return textEncoder.encode(json);
            }
            catch (e) {
                throw ConnectError.from(e, Code.Internal);
            }
        },
    };
}

// Copyright 2021-2023 The Connect Authors
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
/**
 * Regular Expression that matches any valid Connect Content-Type header value.
 *
 * @private Internal code, does not follow semantic versioning.
 */
const contentTypeRegExp = /^application\/(connect\+)?(?:(json)(?:; ?charset=utf-?8)?|(proto))$/i;
const contentTypeUnaryProto = "application/proto";
const contentTypeUnaryJson = "application/json";
const contentTypeStreamProto = "application/connect+proto";
const contentTypeStreamJson = "application/connect+json";
/**
 * Parse a Connect Content-Type header.
 *
 * @private Internal code, does not follow semantic versioning.
 */
function parseContentType(contentType) {
    const match = contentType === null || contentType === void 0 ? void 0 : contentType.match(contentTypeRegExp);
    if (!match) {
        return undefined;
    }
    const stream = !!match[1];
    const binary = !!match[3];
    return { stream, binary };
}

// Copyright 2021-2023 The Connect Authors
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
(undefined && undefined.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
/**
 * Parse a Connect error from a JSON value.
 * Will return a ConnectError, and throw the provided fallback if parsing failed.
 *
 * @private Internal code, does not follow semantic versioning.
 */
function errorFromJson(jsonValue, metadata, fallback) {
    if (metadata) {
        new Headers(metadata).forEach((value, key) => fallback.metadata.append(key, value));
    }
    if (typeof jsonValue !== "object" ||
        jsonValue == null ||
        Array.isArray(jsonValue) ||
        !("code" in jsonValue) ||
        typeof jsonValue.code !== "string") {
        throw fallback;
    }
    const code = codeFromString(jsonValue.code);
    if (code === undefined) {
        throw fallback;
    }
    const message = jsonValue.message;
    if (message != null && typeof message !== "string") {
        throw fallback;
    }
    const error = new ConnectError(message !== null && message !== void 0 ? message : "", code, metadata);
    if ("details" in jsonValue && Array.isArray(jsonValue.details)) {
        for (const detail of jsonValue.details) {
            if (detail === null ||
                typeof detail != "object" ||
                Array.isArray(detail) ||
                typeof detail.type != "string" ||
                typeof detail.value != "string" ||
                ("debug" in detail && typeof detail.debug != "object")) {
                throw fallback;
            }
            try {
                error.details.push({
                    type: detail.type,
                    value: protoBase64.dec(detail.value),
                    debug: detail.debug,
                });
            }
            catch (e) {
                throw fallback;
            }
        }
    }
    return error;
}

// Copyright 2021-2023 The Connect Authors
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
/**
 * endStreamFlag indicates that the data in a EnvelopedMessage
 * is a EndStreamResponse of the Connect protocol.
 *
 * @private Internal code, does not follow semantic versioning.
 */
const endStreamFlag = 0b00000010;
/**
 * Parse an EndStreamResponse of the Connect protocol.
 * Throws a ConnectError on malformed input.
 *
 * @private Internal code, does not follow semantic versioning.
 */
function endStreamFromJson(data) {
    const parseErr = new ConnectError("invalid end stream", Code.InvalidArgument);
    let jsonValue;
    try {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        jsonValue = JSON.parse(typeof data == "string" ? data : new TextDecoder().decode(data));
    }
    catch (e) {
        throw parseErr;
    }
    if (typeof jsonValue != "object" ||
        jsonValue == null ||
        Array.isArray(jsonValue)) {
        throw parseErr;
    }
    const metadata = new Headers();
    if ("metadata" in jsonValue) {
        if (typeof jsonValue.metadata != "object" ||
            jsonValue.metadata == null ||
            Array.isArray(jsonValue.metadata)) {
            throw parseErr;
        }
        for (const [key, values] of Object.entries(jsonValue.metadata)) {
            if (!Array.isArray(values) ||
                values.some((value) => typeof value != "string")) {
                throw parseErr;
            }
            for (const value of values) {
                metadata.append(key, value);
            }
        }
    }
    const error = "error" in jsonValue
        ? errorFromJson(jsonValue.error, metadata, parseErr)
        : undefined;
    return { metadata, error };
}

// Copyright 2021-2023 The Connect Authors
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
/**
 * @private Internal code, does not follow semantic versioning.
 */
const headerContentType = "Content-Type";
const headerUnaryContentLength = "Content-Length";
const headerUnaryEncoding = "Content-Encoding";
const headerUnaryAcceptEncoding = "Accept-Encoding";
const headerTimeout = "Connect-Timeout-Ms";
const headerProtocolVersion = "Connect-Protocol-Version";
const headerUserAgent = "User-Agent";

// Copyright 2021-2023 The Connect Authors
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
/**
 * Determine the Connect error code for the given HTTP status code.
 * See https://connectrpc.com/docs/protocol#error-codes
 *
 * @private Internal code, does not follow semantic versioning.
 */
function codeFromHttpStatus(httpStatus) {
    switch (httpStatus) {
        case 400: // Bad Request
            return Code.InvalidArgument;
        case 401: // Unauthorized
            return Code.Unauthenticated;
        case 403: // Forbidden
            return Code.PermissionDenied;
        case 404: // Not Found
            return Code.Unimplemented;
        case 408: // Request Timeout
            return Code.DeadlineExceeded;
        case 409: // Conflict
            return Code.Aborted;
        case 412: // Precondition Failed
            return Code.FailedPrecondition;
        case 413: // Payload Too Large
            return Code.ResourceExhausted;
        case 415: // Unsupported Media Type
            return Code.Internal;
        case 429: // Too Many Requests
            return Code.Unavailable;
        case 431: // Request Header Fields Too Large
            return Code.ResourceExhausted;
        case 502: // Bad Gateway
            return Code.Unavailable;
        case 503: // Service Unavailable
            return Code.Unavailable;
        case 504: // Gateway Timeout
            return Code.Unavailable;
        default:
            return Code.Unknown;
    }
}

// Copyright 2021-2023 The Connect Authors
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
/**
 * In unary RPCs, Connect transports trailing metadata as response header
 * fields, prefixed with "trailer-".
 *
 * This function demuxes headers and trailers into two separate Headers
 * objects.
 *
 * @private Internal code, does not follow semantic versioning.
 */
function trailerDemux(header) {
    const h = new Headers(), t = new Headers();
    header.forEach((value, key) => {
        if (key.toLowerCase().startsWith("trailer-")) {
            t.set(key.substring(8), value);
        }
        else {
            h.set(key, value);
        }
    });
    return [h, t];
}

// Copyright 2021-2023 The Connect Authors
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
/**
 * The only know value for the header Connect-Protocol-Version.
 *
 * @private Internal code, does not follow semantic versioning.
 */
const protocolVersion = "1";

// Copyright 2021-2023 The Connect Authors
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
/**
 * Creates headers for a Connect request.
 *
 * @private Internal code, does not follow semantic versioning.
 */
function requestHeader(methodKind, useBinaryFormat, timeoutMs, userProvidedHeaders) {
    const result = new Headers(userProvidedHeaders !== null && userProvidedHeaders !== void 0 ? userProvidedHeaders : {});
    if (timeoutMs !== undefined) {
        result.set(headerTimeout, `${timeoutMs}`);
    }
    result.set(headerContentType, methodKind == MethodKind.Unary
        ? useBinaryFormat
            ? contentTypeUnaryProto
            : contentTypeUnaryJson
        : useBinaryFormat
            ? contentTypeStreamProto
            : contentTypeStreamJson);
    result.set(headerProtocolVersion, protocolVersion);
    result.set(headerUserAgent, "connect-es/1.1.3");
    return result;
}

// Copyright 2021-2023 The Connect Authors
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
/**
 * Validates response status and header for the Connect protocol.
 * Throws a ConnectError if the header indicates an error, or if
 * the content type is unexpected, with the following exception:
 * For unary RPCs with an HTTP error status, this returns an error
 * derived from the HTTP status instead of throwing it, giving an
 * implementation a chance to parse a Connect error from the wire.
 *
 * @private Internal code, does not follow semantic versioning.
 */
function validateResponse(methodKind, status, headers) {
    const mimeType = headers.get("Content-Type");
    const parsedType = parseContentType(mimeType);
    if (status !== 200) {
        const errorFromStatus = new ConnectError(`HTTP ${status}`, codeFromHttpStatus(status), headers);
        // If parsedType is defined and it is not binary, then this is a unary JSON response
        if (methodKind == MethodKind.Unary && parsedType && !parsedType.binary) {
            return { isUnaryError: true, unaryError: errorFromStatus };
        }
        throw errorFromStatus;
    }
    return { isUnaryError: false };
}

// Copyright 2021-2023 The Connect Authors
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
const contentTypePrefix = "application/";
function encodeMessageForUrl(message, useBase64) {
    if (useBase64) {
        // TODO(jchadwick-buf): Three regex replaces seems excessive.
        // Can we make protoBase64.enc more flexible?
        return protoBase64
            .enc(message)
            .replace(/\+/g, "-")
            .replace(/\//g, "_")
            .replace(/=+$/, "");
    }
    else {
        return encodeURIComponent(new TextDecoder().decode(message));
    }
}
/**
 * @private Internal code, does not follow semantic versioning.
 */
function transformConnectPostToGetRequest(request, message, useBase64) {
    let query = `?connect=v${protocolVersion}`;
    const contentType = request.header.get(headerContentType);
    if ((contentType === null || contentType === void 0 ? void 0 : contentType.indexOf(contentTypePrefix)) === 0) {
        query +=
            "&encoding=" +
                encodeURIComponent(contentType.slice(contentTypePrefix.length));
    }
    const compression = request.header.get(headerUnaryEncoding);
    if (compression !== null && compression !== "identity") {
        query += "&compression=" + encodeURIComponent(compression);
        // Force base64 for compressed payloads.
        useBase64 = true;
    }
    if (useBase64) {
        query += "&base64=1";
    }
    query += "&message=" + encodeMessageForUrl(message, useBase64);
    const url = request.url + query;
    // Omit headers that are not used for unary GET requests.
    const header = new Headers(request.header);
    [
        headerProtocolVersion,
        headerContentType,
        headerUnaryContentLength,
        headerUnaryEncoding,
        headerUnaryAcceptEncoding,
    ].forEach((h) => header.delete(h));
    return Object.assign(Object.assign({}, request), { init: Object.assign(Object.assign({}, request.init), { method: "GET" }), url,
        header });
}

// Copyright 2021-2023 The Connect Authors
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
/**
 * Runs a unary method with the given interceptors. Note that this function
 * is only used when implementing a Transport.
 */
function runUnaryCall(opt) {
    const next = applyInterceptors(opt.next, opt.interceptors);
    const [signal, abort, done] = setupSignal(opt);
    const req = Object.assign(Object.assign({}, opt.req), { message: normalize(opt.req.method.I, opt.req.message), signal });
    return next(req).then((res) => {
        done();
        return res;
    }, abort);
}
/**
 * Runs a server-streaming method with the given interceptors. Note that this
 * function is only used when implementing a Transport.
 */
function runStreamingCall(opt) {
    const next = applyInterceptors(opt.next, opt.interceptors);
    const [signal, abort, done] = setupSignal(opt);
    const req = Object.assign(Object.assign({}, opt.req), { message: normalizeIterable(opt.req.method.I, opt.req.message), signal });
    let doneCalled = false;
    // Call return on the request iterable to indicate
    // that we will no longer consume it and it should
    // cleanup any allocated resources.
    signal.addEventListener("abort", function () {
        var _a, _b;
        const it = opt.req.message[Symbol.asyncIterator]();
        // If the signal is aborted due to an error, we want to throw
        // the error to the request iterator.
        if (!doneCalled) {
            (_a = it.throw) === null || _a === void 0 ? void 0 : _a.call(it, this.reason).catch(() => {
                // throw returns a promise, which we don't care about.
                //
                // Uncaught promises are thrown at sometime/somewhere by the event loop,
                // this is to ensure error is caught and ignored.
            });
        }
        (_b = it.return) === null || _b === void 0 ? void 0 : _b.call(it).catch(() => {
            // return returns a promise, which we don't care about.
            //
            // Uncaught promises are thrown at sometime/somewhere by the event loop,
            // this is to ensure error is caught and ignored.
        });
    });
    return next(req).then((res) => {
        return Object.assign(Object.assign({}, res), { message: {
                [Symbol.asyncIterator]() {
                    const it = res.message[Symbol.asyncIterator]();
                    return {
                        next() {
                            return it.next().then((r) => {
                                if (r.done == true) {
                                    doneCalled = true;
                                    done();
                                }
                                return r;
                            }, abort);
                        },
                        // We deliberately omit throw/return.
                    };
                },
            } });
    }, abort);
}
/**
 * Create an AbortSignal for Transport implementations. The signal is available
 * in UnaryRequest and StreamingRequest, and is triggered when the call is
 * aborted (via a timeout or explicit cancellation), errored (e.g. when reading
 * an error from the server from the wire), or finished successfully.
 *
 * Transport implementations can pass the signal to HTTP clients to ensure that
 * there are no unused connections leak.
 *
 * Returns a tuple:
 * [0]: The signal, which is also aborted if the optional deadline is reached.
 * [1]: Function to call if the Transport encountered an error.
 * [2]: Function to call if the Transport finished without an error.
 */
function setupSignal(opt) {
    const { signal, cleanup } = createDeadlineSignal(opt.timeoutMs);
    const controller = createLinkedAbortController(opt.signal, signal);
    return [
        controller.signal,
        function abort(reason) {
            // We peek at the deadline signal because fetch() will throw an error on
            // abort that discards the signal reason.
            const e = ConnectError.from(signal.aborted ? getAbortSignalReason(signal) : reason);
            controller.abort(e);
            cleanup();
            return Promise.reject(e);
        },
        function done() {
            cleanup();
            controller.abort();
        },
    ];
}
/**
 * applyInterceptors takes the given UnaryFn or ServerStreamingFn, and wraps
 * it with each of the given interceptors, returning a new UnaryFn or
 * ServerStreamingFn.
 */
function applyInterceptors(next, interceptors) {
    var _a;
    return ((_a = interceptors === null || interceptors === void 0 ? void 0 : interceptors.concat().reverse().reduce(
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    (n, i) => i(n), next)) !== null && _a !== void 0 ? _a : next);
}

// Copyright 2021-2023 The Connect Authors
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
/**
 * Asserts that the fetch API is available.
 */
function assertFetchApi() {
    try {
        new Headers();
    }
    catch (_) {
        throw new Error("connect-web requires the fetch API. Are you running on an old version of Node.js? Node.js is not supported in Connect for Web - please stay tuned for Connect for Node.");
    }
}

// Copyright 2021-2023 The Connect Authors
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
var __await = (undefined && undefined.__await) || function (v) { return this instanceof __await ? (this.v = v, this) : new __await(v); };
var __asyncGenerator = (undefined && undefined.__asyncGenerator) || function (thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
    function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
    function fulfill(value) { resume("next", value); }
    function reject(value) { resume("throw", value); }
    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
};
/**
 * Create a Transport for the Connect protocol, which makes unary and
 * server-streaming methods available to web browsers. It uses the fetch
 * API to make HTTP requests.
 */
function createConnectTransport(options) {
    var _a;
    assertFetchApi();
    const useBinaryFormat = (_a = options.useBinaryFormat) !== null && _a !== void 0 ? _a : false;
    return {
        async unary(service, method, signal, timeoutMs, header, message, contextValues) {
            var _a;
            const { serialize, parse } = createClientMethodSerializers(method, useBinaryFormat, options.jsonOptions, options.binaryOptions);
            timeoutMs =
                timeoutMs === undefined
                    ? options.defaultTimeoutMs
                    : timeoutMs <= 0
                        ? undefined
                        : timeoutMs;
            return await runUnaryCall({
                interceptors: options.interceptors,
                signal,
                timeoutMs,
                req: {
                    stream: false,
                    service,
                    method,
                    url: createMethodUrl(options.baseUrl, service, method),
                    init: {
                        method: "POST",
                        credentials: (_a = options.credentials) !== null && _a !== void 0 ? _a : "same-origin",
                        redirect: "error",
                        mode: "cors",
                    },
                    header: requestHeader(method.kind, useBinaryFormat, timeoutMs, header),
                    contextValues: contextValues !== null && contextValues !== void 0 ? contextValues : createContextValues(),
                    message,
                },
                next: async (req) => {
                    var _a;
                    const useGet = options.useHttpGet === true &&
                        method.idempotency === MethodIdempotency.NoSideEffects;
                    let body = null;
                    if (useGet) {
                        req = transformConnectPostToGetRequest(req, serialize(req.message), useBinaryFormat);
                    }
                    else {
                        body = serialize(req.message);
                    }
                    const fetch = (_a = options.fetch) !== null && _a !== void 0 ? _a : globalThis.fetch;
                    const response = await fetch(req.url, Object.assign(Object.assign({}, req.init), { headers: req.header, signal: req.signal, body }));
                    const { isUnaryError, unaryError } = validateResponse(method.kind, response.status, response.headers);
                    if (isUnaryError) {
                        throw errorFromJson((await response.json()), appendHeaders(...trailerDemux(response.headers)), unaryError);
                    }
                    const [demuxedHeader, demuxedTrailer] = trailerDemux(response.headers);
                    return {
                        stream: false,
                        service,
                        method,
                        header: demuxedHeader,
                        message: useBinaryFormat
                            ? parse(new Uint8Array(await response.arrayBuffer()))
                            : method.O.fromJson((await response.json()), getJsonOptions(options.jsonOptions)),
                        trailer: demuxedTrailer,
                    };
                },
            });
        },
        async stream(service, method, signal, timeoutMs, header, input, contextValues) {
            var _a;
            const { serialize, parse } = createClientMethodSerializers(method, useBinaryFormat, options.jsonOptions, options.binaryOptions);
            function parseResponseBody(body, trailerTarget) {
                return __asyncGenerator(this, arguments, function* parseResponseBody_1() {
                    const reader = createEnvelopeReadableStream(body).getReader();
                    let endStreamReceived = false;
                    for (;;) {
                        const result = yield __await(reader.read());
                        if (result.done) {
                            break;
                        }
                        const { flags, data } = result.value;
                        if ((flags & endStreamFlag) === endStreamFlag) {
                            endStreamReceived = true;
                            const endStream = endStreamFromJson(data);
                            if (endStream.error) {
                                throw endStream.error;
                            }
                            endStream.metadata.forEach((value, key) => trailerTarget.set(key, value));
                            continue;
                        }
                        yield yield __await(parse(data));
                    }
                    if (!endStreamReceived) {
                        throw "missing EndStreamResponse";
                    }
                });
            }
            async function createRequestBody(input) {
                if (method.kind != MethodKind.ServerStreaming) {
                    throw "The fetch API does not support streaming request bodies";
                }
                const r = await input[Symbol.asyncIterator]().next();
                if (r.done == true) {
                    throw "missing request message";
                }
                return encodeEnvelope(0, serialize(r.value));
            }
            timeoutMs =
                timeoutMs === undefined
                    ? options.defaultTimeoutMs
                    : timeoutMs <= 0
                        ? undefined
                        : timeoutMs;
            return await runStreamingCall({
                interceptors: options.interceptors,
                timeoutMs,
                signal,
                req: {
                    stream: true,
                    service,
                    method,
                    url: createMethodUrl(options.baseUrl, service, method),
                    init: {
                        method: "POST",
                        credentials: (_a = options.credentials) !== null && _a !== void 0 ? _a : "same-origin",
                        redirect: "error",
                        mode: "cors",
                    },
                    header: requestHeader(method.kind, useBinaryFormat, timeoutMs, header),
                    contextValues: contextValues !== null && contextValues !== void 0 ? contextValues : createContextValues(),
                    message: input,
                },
                next: async (req) => {
                    var _a;
                    const fetch = (_a = options.fetch) !== null && _a !== void 0 ? _a : globalThis.fetch;
                    const fRes = await fetch(req.url, Object.assign(Object.assign({}, req.init), { headers: req.header, signal: req.signal, body: await createRequestBody(req.message) }));
                    validateResponse(method.kind, fRes.status, fRes.headers);
                    if (fRes.body === null) {
                        throw "missing response body";
                    }
                    const trailer = new Headers();
                    const res = Object.assign(Object.assign({}, req), { header: fRes.headers, trailer, message: parseResponseBody(fRes.body, trailer) });
                    return res;
                },
            });
        },
    };
}

/**
 * Status of the Codeium AI completions generation.
 */
var Status;
(function (Status) {
    Status["INACTIVE"] = "inactive";
    Status["PROCESSING"] = "processing";
    Status["SUCCESS"] = "success";
    Status["WARNING"] = "warning";
    Status["ERROR"] = "error";
})(Status || (Status = {}));

function _defineProperty$1(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function ownKeys$1(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2$1(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys$1(Object(source), true).forEach(function (key) {
        _defineProperty$1(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys$1(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};

  var target = _objectWithoutPropertiesLoose(source, excluded);

  var key, i;

  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }

  return target;
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArrayLimit(arr, i) {
  if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

function compose$1() {
  for (var _len = arguments.length, fns = new Array(_len), _key = 0; _key < _len; _key++) {
    fns[_key] = arguments[_key];
  }

  return function (x) {
    return fns.reduceRight(function (y, f) {
      return f(y);
    }, x);
  };
}

function curry$1(fn) {
  return function curried() {
    var _this = this;

    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    return args.length >= fn.length ? fn.apply(this, args) : function () {
      for (var _len3 = arguments.length, nextArgs = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        nextArgs[_key3] = arguments[_key3];
      }

      return curried.apply(_this, [].concat(args, nextArgs));
    };
  };
}

function isObject$1(value) {
  return {}.toString.call(value).includes('Object');
}

function isEmpty(obj) {
  return !Object.keys(obj).length;
}

function isFunction(value) {
  return typeof value === 'function';
}

function hasOwnProperty(object, property) {
  return Object.prototype.hasOwnProperty.call(object, property);
}

function validateChanges(initial, changes) {
  if (!isObject$1(changes)) errorHandler$1('changeType');
  if (Object.keys(changes).some(function (field) {
    return !hasOwnProperty(initial, field);
  })) errorHandler$1('changeField');
  return changes;
}

function validateSelector(selector) {
  if (!isFunction(selector)) errorHandler$1('selectorType');
}

function validateHandler(handler) {
  if (!(isFunction(handler) || isObject$1(handler))) errorHandler$1('handlerType');
  if (isObject$1(handler) && Object.values(handler).some(function (_handler) {
    return !isFunction(_handler);
  })) errorHandler$1('handlersType');
}

function validateInitial(initial) {
  if (!initial) errorHandler$1('initialIsRequired');
  if (!isObject$1(initial)) errorHandler$1('initialType');
  if (isEmpty(initial)) errorHandler$1('initialContent');
}

function throwError$1(errorMessages, type) {
  throw new Error(errorMessages[type] || errorMessages["default"]);
}

var errorMessages$1 = {
  initialIsRequired: 'initial state is required',
  initialType: 'initial state should be an object',
  initialContent: 'initial state shouldn\'t be an empty object',
  handlerType: 'handler should be an object or a function',
  handlersType: 'all handlers should be a functions',
  selectorType: 'selector should be a function',
  changeType: 'provided value of changes should be an object',
  changeField: 'it seams you want to change a field in the state which is not specified in the "initial" state',
  "default": 'an unknown error accured in `state-local` package'
};
var errorHandler$1 = curry$1(throwError$1)(errorMessages$1);
var validators$1 = {
  changes: validateChanges,
  selector: validateSelector,
  handler: validateHandler,
  initial: validateInitial
};

function create(initial) {
  var handler = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  validators$1.initial(initial);
  validators$1.handler(handler);
  var state = {
    current: initial
  };
  var didUpdate = curry$1(didStateUpdate)(state, handler);
  var update = curry$1(updateState)(state);
  var validate = curry$1(validators$1.changes)(initial);
  var getChanges = curry$1(extractChanges)(state);

  function getState() {
    var selector = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function (state) {
      return state;
    };
    validators$1.selector(selector);
    return selector(state.current);
  }

  function setState(causedChanges) {
    compose$1(didUpdate, update, validate, getChanges)(causedChanges);
  }

  return [getState, setState];
}

function extractChanges(state, causedChanges) {
  return isFunction(causedChanges) ? causedChanges(state.current) : causedChanges;
}

function updateState(state, changes) {
  state.current = _objectSpread2(_objectSpread2({}, state.current), changes);
  return changes;
}

function didStateUpdate(state, handler, changes) {
  isFunction(handler) ? handler(state.current) : Object.keys(changes).forEach(function (field) {
    var _handler$field;

    return (_handler$field = handler[field]) === null || _handler$field === void 0 ? void 0 : _handler$field.call(handler, state.current[field]);
  });
  return changes;
}

var index = {
  create: create
};

var config$1 = {
  paths: {
    vs: 'https://cdn.jsdelivr.net/npm/monaco-editor@0.43.0/min/vs'
  }
};

function curry(fn) {
  return function curried() {
    var _this = this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return args.length >= fn.length ? fn.apply(this, args) : function () {
      for (var _len2 = arguments.length, nextArgs = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        nextArgs[_key2] = arguments[_key2];
      }

      return curried.apply(_this, [].concat(args, nextArgs));
    };
  };
}

function isObject(value) {
  return {}.toString.call(value).includes('Object');
}

/**
 * validates the configuration object and informs about deprecation
 * @param {Object} config - the configuration object 
 * @return {Object} config - the validated configuration object
 */

function validateConfig(config) {
  if (!config) errorHandler('configIsRequired');
  if (!isObject(config)) errorHandler('configType');

  if (config.urls) {
    informAboutDeprecation();
    return {
      paths: {
        vs: config.urls.monacoBase
      }
    };
  }

  return config;
}
/**
 * logs deprecation message
 */


function informAboutDeprecation() {
  console.warn(errorMessages.deprecation);
}

function throwError(errorMessages, type) {
  throw new Error(errorMessages[type] || errorMessages["default"]);
}

var errorMessages = {
  configIsRequired: 'the configuration object is required',
  configType: 'the configuration object should be an object',
  "default": 'an unknown error accured in `@monaco-editor/loader` package',
  deprecation: "Deprecation warning!\n    You are using deprecated way of configuration.\n\n    Instead of using\n      monaco.config({ urls: { monacoBase: '...' } })\n    use\n      monaco.config({ paths: { vs: '...' } })\n\n    For more please check the link https://github.com/suren-atoyan/monaco-loader#config\n  "
};
var errorHandler = curry(throwError)(errorMessages);
var validators = {
  config: validateConfig
};

var compose = function compose() {
  for (var _len = arguments.length, fns = new Array(_len), _key = 0; _key < _len; _key++) {
    fns[_key] = arguments[_key];
  }

  return function (x) {
    return fns.reduceRight(function (y, f) {
      return f(y);
    }, x);
  };
};

function merge(target, source) {
  Object.keys(source).forEach(function (key) {
    if (source[key] instanceof Object) {
      if (target[key]) {
        Object.assign(source[key], merge(target[key], source[key]));
      }
    }
  });
  return _objectSpread2$1(_objectSpread2$1({}, target), source);
}

// The source (has been changed) is https://github.com/facebook/react/issues/5465#issuecomment-157888325
var CANCELATION_MESSAGE = {
  type: 'cancelation',
  msg: 'operation is manually canceled'
};

function makeCancelable(promise) {
  var hasCanceled_ = false;
  var wrappedPromise = new Promise(function (resolve, reject) {
    promise.then(function (val) {
      return hasCanceled_ ? reject(CANCELATION_MESSAGE) : resolve(val);
    });
    promise["catch"](reject);
  });
  return wrappedPromise.cancel = function () {
    return hasCanceled_ = true;
  }, wrappedPromise;
}

/** the local state of the module */

var _state$create = index.create({
  config: config$1,
  isInitialized: false,
  resolve: null,
  reject: null,
  monaco: null
}),
    _state$create2 = _slicedToArray(_state$create, 2),
    getState = _state$create2[0],
    setState = _state$create2[1];
/**
 * set the loader configuration
 * @param {Object} config - the configuration object
 */


function config(globalConfig) {
  var _validators$config = validators.config(globalConfig),
      monaco = _validators$config.monaco,
      config = _objectWithoutProperties(_validators$config, ["monaco"]);

  setState(function (state) {
    return {
      config: merge(state.config, config),
      monaco: monaco
    };
  });
}
/**
 * handles the initialization of the monaco-editor
 * @return {Promise} - returns an instance of monaco (with a cancelable promise)
 */


function init() {
  var state = getState(function (_ref) {
    var monaco = _ref.monaco,
        isInitialized = _ref.isInitialized,
        resolve = _ref.resolve;
    return {
      monaco: monaco,
      isInitialized: isInitialized,
      resolve: resolve
    };
  });

  if (!state.isInitialized) {
    setState({
      isInitialized: true
    });

    if (state.monaco) {
      state.resolve(state.monaco);
      return makeCancelable(wrapperPromise);
    }

    if (window.monaco && window.monaco.editor) {
      storeMonacoInstance(window.monaco);
      state.resolve(window.monaco);
      return makeCancelable(wrapperPromise);
    }

    compose(injectScripts, getMonacoLoaderScript)(configureLoader);
  }

  return makeCancelable(wrapperPromise);
}
/**
 * injects provided scripts into the document.body
 * @param {Object} script - an HTML script element
 * @return {Object} - the injected HTML script element
 */


function injectScripts(script) {
  return document.body.appendChild(script);
}
/**
 * creates an HTML script element with/without provided src
 * @param {string} [src] - the source path of the script
 * @return {Object} - the created HTML script element
 */


function createScript(src) {
  var script = document.createElement('script');
  return src && (script.src = src), script;
}
/**
 * creates an HTML script element with the monaco loader src
 * @return {Object} - the created HTML script element
 */


function getMonacoLoaderScript(configureLoader) {
  var state = getState(function (_ref2) {
    var config = _ref2.config,
        reject = _ref2.reject;
    return {
      config: config,
      reject: reject
    };
  });
  var loaderScript = createScript("".concat(state.config.paths.vs, "/loader.js"));

  loaderScript.onload = function () {
    return configureLoader();
  };

  loaderScript.onerror = state.reject;
  return loaderScript;
}
/**
 * configures the monaco loader
 */


function configureLoader() {
  var state = getState(function (_ref3) {
    var config = _ref3.config,
        resolve = _ref3.resolve,
        reject = _ref3.reject;
    return {
      config: config,
      resolve: resolve,
      reject: reject
    };
  });
  var require = window.require;

  require.config(state.config);

  require(['vs/editor/editor.main'], function (monaco) {
    storeMonacoInstance(monaco);
    state.resolve(monaco);
  }, function (error) {
    state.reject(error);
  });
}
/**
 * store monaco instance in local state
 */


function storeMonacoInstance(monaco) {
  if (!getState().monaco) {
    setState({
      monaco: monaco
    });
  }
}
/**
 * internal helper function
 * extracts stored monaco instance
 * @return {Object|null} - the monaco instance
 */


function __getMonacoInstance() {
  return getState(function (_ref4) {
    var monaco = _ref4.monaco;
    return monaco;
  });
}

var wrapperPromise = new Promise(function (resolve, reject) {
  return setState({
    resolve: resolve,
    reject: reject
  });
});
var loader = {
  config: config,
  init: init,
  __getMonacoInstance: __getMonacoInstance
};

var le={wrapper:{display:"flex",position:"relative",textAlign:"initial"},fullWidth:{width:"100%"},hide:{display:"none"}},v=le;var ae={container:{display:"flex",height:"100%",width:"100%",justifyContent:"center",alignItems:"center"}},Y=ae;function Me({children:e}){return React.createElement("div",{style:Y.container},e)}var Z=Me;var $=Z;function Ee({width:e,height:r,isEditorReady:n,loading:t,_ref:a,className:m,wrapperProps:E}){return React.createElement("section",{style:{...v.wrapper,width:e,height:r},...E},!n&&React.createElement($,null,t),React.createElement("div",{ref:a,style:{...v.fullWidth,...!n&&v.hide},className:m}))}var ee=Ee;var H=memo(ee);function Ce(e){useEffect(e,[]);}var k=Ce;function he(e,r,n=!0){let t=useRef(!0);useEffect(t.current||!n?()=>{t.current=!1;}:e,r);}var l=he;function D(){}function h(e,r,n,t){return De(e,t)||be(e,r,n,t)}function De(e,r){return e.editor.getModel(te(e,r))}function be(e,r,n,t){return e.editor.createModel(r,n,t?te(e,t):void 0)}function te(e,r){return e.Uri.parse(r)}function Oe({original:e,modified:r,language:n,originalLanguage:t,modifiedLanguage:a,originalModelPath:m,modifiedModelPath:E,keepCurrentOriginalModel:g=!1,keepCurrentModifiedModel:N=!1,theme:x="light",loading:P="Loading...",options:y={},height:V="100%",width:z="100%",className:F,wrapperProps:j={},beforeMount:A=D,onMount:q=D}){let[M,O]=useState(!1),[T,s]=useState(!0),u=useRef(null),c=useRef(null),w=useRef(null),d=useRef(q),o=useRef(A),b=useRef(!1);k(()=>{let i=loader.init();return i.then(f=>(c.current=f)&&s(!1)).catch(f=>f?.type!=="cancelation"&&console.error("Monaco initialization: error:",f)),()=>u.current?I():i.cancel()}),l(()=>{if(u.current&&c.current){let i=u.current.getOriginalEditor(),f=h(c.current,e||"",t||n||"text",m||"");f!==i.getModel()&&i.setModel(f);}},[m],M),l(()=>{if(u.current&&c.current){let i=u.current.getModifiedEditor(),f=h(c.current,r||"",a||n||"text",E||"");f!==i.getModel()&&i.setModel(f);}},[E],M),l(()=>{let i=u.current.getModifiedEditor();i.getOption(c.current.editor.EditorOption.readOnly)?i.setValue(r||""):r!==i.getValue()&&(i.executeEdits("",[{range:i.getModel().getFullModelRange(),text:r||"",forceMoveMarkers:!0}]),i.pushUndoStop());},[r],M),l(()=>{u.current?.getModel()?.original.setValue(e||"");},[e],M),l(()=>{let{original:i,modified:f}=u.current.getModel();c.current.editor.setModelLanguage(i,t||n||"text"),c.current.editor.setModelLanguage(f,a||n||"text");},[n,t,a],M),l(()=>{c.current?.editor.setTheme(x);},[x],M),l(()=>{u.current?.updateOptions(y);},[y],M);let L=useCallback(()=>{if(!c.current)return;o.current(c.current);let i=h(c.current,e||"",t||n||"text",m||""),f=h(c.current,r||"",a||n||"text",E||"");u.current?.setModel({original:i,modified:f});},[n,r,a,e,t,m,E]),U=useCallback(()=>{!b.current&&w.current&&(u.current=c.current.editor.createDiffEditor(w.current,{automaticLayout:!0,...y}),L(),c.current?.editor.setTheme(x),O(!0),b.current=!0);},[y,x,L]);useEffect(()=>{M&&d.current(u.current,c.current);},[M]),useEffect(()=>{!T&&!M&&U();},[T,M,U]);function I(){let i=u.current?.getModel();g||i?.original?.dispose(),N||i?.modified?.dispose(),u.current?.dispose();}return React.createElement(H,{width:z,height:V,isEditorReady:M,loading:P,_ref:w,className:F,wrapperProps:j})}var ie=Oe;memo(ie);function He(e){let r=useRef();return useEffect(()=>{r.current=e;},[e]),r.current}var se=He;var _=new Map;function Ve({defaultValue:e,defaultLanguage:r,defaultPath:n,value:t,language:a,path:m,theme:E="light",line:g,loading:N="Loading...",options:x={},overrideServices:P={},saveViewState:y=!0,keepCurrentModel:V=!1,width:z="100%",height:F="100%",className:j,wrapperProps:A={},beforeMount:q=D,onMount:M=D,onChange:O,onValidate:T=D}){let[s,u]=useState(!1),[c,w]=useState(!0),d=useRef(null),o=useRef(null),b=useRef(null),L=useRef(M),U=useRef(q),I=useRef(),i=useRef(t),f=se(m),Q=useRef(!1),B=useRef(!1);k(()=>{let p=loader.init();return p.then(R=>(d.current=R)&&w(!1)).catch(R=>R?.type!=="cancelation"&&console.error("Monaco initialization: error:",R)),()=>o.current?pe():p.cancel()}),l(()=>{let p=h(d.current,e||t||"",r||a||"",m||n||"");p!==o.current?.getModel()&&(y&&_.set(f,o.current?.saveViewState()),o.current?.setModel(p),y&&o.current?.restoreViewState(_.get(m)));},[m],s),l(()=>{o.current?.updateOptions(x);},[x],s),l(()=>{!o.current||t===void 0||(o.current.getOption(d.current.editor.EditorOption.readOnly)?o.current.setValue(t):t!==o.current.getValue()&&(B.current=!0,o.current.executeEdits("",[{range:o.current.getModel().getFullModelRange(),text:t,forceMoveMarkers:!0}]),o.current.pushUndoStop(),B.current=!1));},[t],s),l(()=>{let p=o.current?.getModel();p&&a&&d.current?.editor.setModelLanguage(p,a);},[a],s),l(()=>{g!==void 0&&o.current?.revealLine(g);},[g],s),l(()=>{d.current?.editor.setTheme(E);},[E],s);let X=useCallback(()=>{if(!(!b.current||!d.current)&&!Q.current){U.current(d.current);let p=m||n,R=h(d.current,t||e||"",r||a||"",p||"");o.current=d.current?.editor.create(b.current,{model:R,automaticLayout:!0,...x},P),y&&o.current.restoreViewState(_.get(p)),d.current.editor.setTheme(E),g!==void 0&&o.current.revealLine(g),u(!0),Q.current=!0;}},[e,r,n,t,a,m,x,P,y,E,g]);useEffect(()=>{s&&L.current(o.current,d.current);},[s]),useEffect(()=>{!c&&!s&&X();},[c,s,X]),i.current=t,useEffect(()=>{s&&O&&(I.current?.dispose(),I.current=o.current?.onDidChangeModelContent(p=>{B.current||O(o.current.getValue(),p);}));},[s,O]),useEffect(()=>{if(s){let p=d.current.editor.onDidChangeMarkers(R=>{let G=o.current.getModel()?.uri;if(G&&R.find(J=>J.path===G.path)){let J=d.current.editor.getModelMarkers({resource:G});T?.(J);}});return ()=>{p?.dispose();}}return ()=>{}},[s,T]);function pe(){I.current?.dispose(),V?y&&_.set(m,o.current.saveViewState()):o.current.getModel()?.dispose(),o.current.dispose();}return React.createElement(H,{width:z,height:F,isEditorReady:s,loading:N,_ref:b,className:j,wrapperProps:A})}var fe=Ve;var de=memo(fe);var Ft=de;

const getDefaultValue = (language) => {
    switch (language) {
        case 'typescript':
        case 'tsx':
        case 'javascript':
        case 'java':
            return `// Welcome to Codeium Editor!
// Press Enter and use Tab to accept AI suggestions. Here's an example:

// fib(n) function to calculate the n-th fibonacci number`;
        case 'python':
            return `# Welcome to Codeium Editor!
# Press Enter and use Tab to accept AI suggestions. Here's an example:

# fib(n) function to calculate the n-th fibonacci number`;
        case 'css':
            return `/* Welcome to Codeium Editor!
Press Enter and use Tab to accept AI suggestions. Here's an example:*/

/* .action-button class with a hover effect. */`;
        default:
            return '';
    }
};

// Copyright Exafunction, Inc.
/**
 * @generated from enum exa.codeium_common_pb.ExperimentKey
 */
var ExperimentKey;
(function (ExperimentKey) {
    /**
     * @generated from enum value: UNSPECIFIED = 0;
     */
    ExperimentKey[ExperimentKey["UNSPECIFIED"] = 0] = "UNSPECIFIED";
    /**
     * @generated from enum value: JUPYTER_FORMAT = 77;
     */
    ExperimentKey[ExperimentKey["JUPYTER_FORMAT"] = 77] = "JUPYTER_FORMAT";
})(ExperimentKey || (ExperimentKey = {}));
// Retrieve enum metadata with: proto3.getEnumType(ExperimentKey)
proto3.util.setEnumType(ExperimentKey, "exa.codeium_common_pb.ExperimentKey", [
    { no: 0, name: "UNSPECIFIED" },
    { no: 77, name: "JUPYTER_FORMAT" },
]);
/**
 * Authentication source for users on the cloud service.
 *
 * @generated from enum exa.codeium_common_pb.AuthSource
 */
var AuthSource;
(function (AuthSource) {
    /**
     * @generated from enum value: AUTH_SOURCE_CODEIUM = 0;
     */
    AuthSource[AuthSource["CODEIUM"] = 0] = "CODEIUM";
})(AuthSource || (AuthSource = {}));
// Retrieve enum metadata with: proto3.getEnumType(AuthSource)
proto3.util.setEnumType(AuthSource, "exa.codeium_common_pb.AuthSource", [
    { no: 0, name: "AUTH_SOURCE_CODEIUM" },
]);
/**
 * @generated from enum exa.codeium_common_pb.EventType
 */
var EventType;
(function (EventType) {
    /**
     * @generated from enum value: EVENT_TYPE_UNSPECIFIED = 0;
     */
    EventType[EventType["UNSPECIFIED"] = 0] = "UNSPECIFIED";
    /**
     * @generated from enum value: EVENT_TYPE_ENABLE_CODEIUM = 1;
     */
    EventType[EventType["ENABLE_CODEIUM"] = 1] = "ENABLE_CODEIUM";
    /**
     * @generated from enum value: EVENT_TYPE_DISABLE_CODEIUM = 2;
     */
    EventType[EventType["DISABLE_CODEIUM"] = 2] = "DISABLE_CODEIUM";
    /**
     * @generated from enum value: EVENT_TYPE_SHOW_PREVIOUS_COMPLETION = 3;
     */
    EventType[EventType["SHOW_PREVIOUS_COMPLETION"] = 3] = "SHOW_PREVIOUS_COMPLETION";
    /**
     * @generated from enum value: EVENT_TYPE_SHOW_NEXT_COMPLETION = 4;
     */
    EventType[EventType["SHOW_NEXT_COMPLETION"] = 4] = "SHOW_NEXT_COMPLETION";
})(EventType || (EventType = {}));
// Retrieve enum metadata with: proto3.getEnumType(EventType)
proto3.util.setEnumType(EventType, "exa.codeium_common_pb.EventType", [
    { no: 0, name: "EVENT_TYPE_UNSPECIFIED" },
    { no: 1, name: "EVENT_TYPE_ENABLE_CODEIUM" },
    { no: 2, name: "EVENT_TYPE_DISABLE_CODEIUM" },
    { no: 3, name: "EVENT_TYPE_SHOW_PREVIOUS_COMPLETION" },
    { no: 4, name: "EVENT_TYPE_SHOW_NEXT_COMPLETION" },
]);
/**
 * @generated from enum exa.codeium_common_pb.CompletionSource
 */
var CompletionSource;
(function (CompletionSource) {
    /**
     * @generated from enum value: COMPLETION_SOURCE_UNSPECIFIED = 0;
     */
    CompletionSource[CompletionSource["UNSPECIFIED"] = 0] = "UNSPECIFIED";
    /**
     * @generated from enum value: COMPLETION_SOURCE_TYPING_AS_SUGGESTED = 1;
     */
    CompletionSource[CompletionSource["TYPING_AS_SUGGESTED"] = 1] = "TYPING_AS_SUGGESTED";
    /**
     * @generated from enum value: COMPLETION_SOURCE_CACHE = 2;
     */
    CompletionSource[CompletionSource["CACHE"] = 2] = "CACHE";
    /**
     * @generated from enum value: COMPLETION_SOURCE_NETWORK = 3;
     */
    CompletionSource[CompletionSource["NETWORK"] = 3] = "NETWORK";
})(CompletionSource || (CompletionSource = {}));
// Retrieve enum metadata with: proto3.getEnumType(CompletionSource)
proto3.util.setEnumType(CompletionSource, "exa.codeium_common_pb.CompletionSource", [
    { no: 0, name: "COMPLETION_SOURCE_UNSPECIFIED" },
    { no: 1, name: "COMPLETION_SOURCE_TYPING_AS_SUGGESTED" },
    { no: 2, name: "COMPLETION_SOURCE_CACHE" },
    { no: 3, name: "COMPLETION_SOURCE_NETWORK" },
]);
/**
 * Every time this list is updated, we should be redeploying the API server
 * since it uses the string representation for BQ.
 *
 * @generated from enum exa.codeium_common_pb.Language
 */
var Language;
(function (Language) {
    /**
     * @generated from enum value: LANGUAGE_UNSPECIFIED = 0;
     */
    Language[Language["UNSPECIFIED"] = 0] = "UNSPECIFIED";
    /**
     * @generated from enum value: LANGUAGE_C = 1;
     */
    Language[Language["C"] = 1] = "C";
    /**
     * @generated from enum value: LANGUAGE_CLOJURE = 2;
     */
    Language[Language["CLOJURE"] = 2] = "CLOJURE";
    /**
     * @generated from enum value: LANGUAGE_COFFEESCRIPT = 3;
     */
    Language[Language["COFFEESCRIPT"] = 3] = "COFFEESCRIPT";
    /**
     * @generated from enum value: LANGUAGE_CPP = 4;
     */
    Language[Language["CPP"] = 4] = "CPP";
    /**
     * @generated from enum value: LANGUAGE_CSHARP = 5;
     */
    Language[Language["CSHARP"] = 5] = "CSHARP";
    /**
     * @generated from enum value: LANGUAGE_CSS = 6;
     */
    Language[Language["CSS"] = 6] = "CSS";
    /**
     * @generated from enum value: LANGUAGE_CUDACPP = 7;
     */
    Language[Language["CUDACPP"] = 7] = "CUDACPP";
    /**
     * @generated from enum value: LANGUAGE_DOCKERFILE = 8;
     */
    Language[Language["DOCKERFILE"] = 8] = "DOCKERFILE";
    /**
     * @generated from enum value: LANGUAGE_GO = 9;
     */
    Language[Language["GO"] = 9] = "GO";
    /**
     * @generated from enum value: LANGUAGE_GROOVY = 10;
     */
    Language[Language["GROOVY"] = 10] = "GROOVY";
    /**
     * @generated from enum value: LANGUAGE_HANDLEBARS = 11;
     */
    Language[Language["HANDLEBARS"] = 11] = "HANDLEBARS";
    /**
     * @generated from enum value: LANGUAGE_HASKELL = 12;
     */
    Language[Language["HASKELL"] = 12] = "HASKELL";
    /**
     * @generated from enum value: LANGUAGE_HCL = 13;
     */
    Language[Language["HCL"] = 13] = "HCL";
    /**
     * @generated from enum value: LANGUAGE_HTML = 14;
     */
    Language[Language["HTML"] = 14] = "HTML";
    /**
     * @generated from enum value: LANGUAGE_INI = 15;
     */
    Language[Language["INI"] = 15] = "INI";
    /**
     * @generated from enum value: LANGUAGE_JAVA = 16;
     */
    Language[Language["JAVA"] = 16] = "JAVA";
    /**
     * @generated from enum value: LANGUAGE_JAVASCRIPT = 17;
     */
    Language[Language["JAVASCRIPT"] = 17] = "JAVASCRIPT";
    /**
     * @generated from enum value: LANGUAGE_JSON = 18;
     */
    Language[Language["JSON"] = 18] = "JSON";
    /**
     * @generated from enum value: LANGUAGE_JULIA = 19;
     */
    Language[Language["JULIA"] = 19] = "JULIA";
    /**
     * @generated from enum value: LANGUAGE_KOTLIN = 20;
     */
    Language[Language["KOTLIN"] = 20] = "KOTLIN";
    /**
     * @generated from enum value: LANGUAGE_LATEX = 21;
     */
    Language[Language["LATEX"] = 21] = "LATEX";
    /**
     * @generated from enum value: LANGUAGE_LESS = 22;
     */
    Language[Language["LESS"] = 22] = "LESS";
    /**
     * @generated from enum value: LANGUAGE_LUA = 23;
     */
    Language[Language["LUA"] = 23] = "LUA";
    /**
     * @generated from enum value: LANGUAGE_MAKEFILE = 24;
     */
    Language[Language["MAKEFILE"] = 24] = "MAKEFILE";
    /**
     * @generated from enum value: LANGUAGE_MARKDOWN = 25;
     */
    Language[Language["MARKDOWN"] = 25] = "MARKDOWN";
    /**
     * @generated from enum value: LANGUAGE_OBJECTIVEC = 26;
     */
    Language[Language["OBJECTIVEC"] = 26] = "OBJECTIVEC";
    /**
     * @generated from enum value: LANGUAGE_OBJECTIVECPP = 27;
     */
    Language[Language["OBJECTIVECPP"] = 27] = "OBJECTIVECPP";
    /**
     * @generated from enum value: LANGUAGE_PERL = 28;
     */
    Language[Language["PERL"] = 28] = "PERL";
    /**
     * @generated from enum value: LANGUAGE_PHP = 29;
     */
    Language[Language["PHP"] = 29] = "PHP";
    /**
     * @generated from enum value: LANGUAGE_PLAINTEXT = 30;
     */
    Language[Language["PLAINTEXT"] = 30] = "PLAINTEXT";
    /**
     * @generated from enum value: LANGUAGE_PROTOBUF = 31;
     */
    Language[Language["PROTOBUF"] = 31] = "PROTOBUF";
    /**
     * @generated from enum value: LANGUAGE_PBTXT = 32;
     */
    Language[Language["PBTXT"] = 32] = "PBTXT";
    /**
     * @generated from enum value: LANGUAGE_PYTHON = 33;
     */
    Language[Language["PYTHON"] = 33] = "PYTHON";
    /**
     * @generated from enum value: LANGUAGE_R = 34;
     */
    Language[Language["R"] = 34] = "R";
    /**
     * @generated from enum value: LANGUAGE_RUBY = 35;
     */
    Language[Language["RUBY"] = 35] = "RUBY";
    /**
     * @generated from enum value: LANGUAGE_RUST = 36;
     */
    Language[Language["RUST"] = 36] = "RUST";
    /**
     * @generated from enum value: LANGUAGE_SASS = 37;
     */
    Language[Language["SASS"] = 37] = "SASS";
    /**
     * @generated from enum value: LANGUAGE_SCALA = 38;
     */
    Language[Language["SCALA"] = 38] = "SCALA";
    /**
     * @generated from enum value: LANGUAGE_SCSS = 39;
     */
    Language[Language["SCSS"] = 39] = "SCSS";
    /**
     * @generated from enum value: LANGUAGE_SHELL = 40;
     */
    Language[Language["SHELL"] = 40] = "SHELL";
    /**
     * @generated from enum value: LANGUAGE_SQL = 41;
     */
    Language[Language["SQL"] = 41] = "SQL";
    /**
     * @generated from enum value: LANGUAGE_STARLARK = 42;
     */
    Language[Language["STARLARK"] = 42] = "STARLARK";
    /**
     * @generated from enum value: LANGUAGE_SWIFT = 43;
     */
    Language[Language["SWIFT"] = 43] = "SWIFT";
    /**
     * @generated from enum value: LANGUAGE_TSX = 44;
     */
    Language[Language["TSX"] = 44] = "TSX";
    /**
     * @generated from enum value: LANGUAGE_TYPESCRIPT = 45;
     */
    Language[Language["TYPESCRIPT"] = 45] = "TYPESCRIPT";
    /**
     * @generated from enum value: LANGUAGE_VISUALBASIC = 46;
     */
    Language[Language["VISUALBASIC"] = 46] = "VISUALBASIC";
    /**
     * @generated from enum value: LANGUAGE_VUE = 47;
     */
    Language[Language["VUE"] = 47] = "VUE";
    /**
     * @generated from enum value: LANGUAGE_XML = 48;
     */
    Language[Language["XML"] = 48] = "XML";
    /**
     * @generated from enum value: LANGUAGE_XSL = 49;
     */
    Language[Language["XSL"] = 49] = "XSL";
    /**
     * @generated from enum value: LANGUAGE_YAML = 50;
     */
    Language[Language["YAML"] = 50] = "YAML";
    /**
     * @generated from enum value: LANGUAGE_SVELTE = 51;
     */
    Language[Language["SVELTE"] = 51] = "SVELTE";
    /**
     * @generated from enum value: LANGUAGE_TOML = 52;
     */
    Language[Language["TOML"] = 52] = "TOML";
    /**
     * @generated from enum value: LANGUAGE_DART = 53;
     */
    Language[Language["DART"] = 53] = "DART";
    /**
     * @generated from enum value: LANGUAGE_RST = 54;
     */
    Language[Language["RST"] = 54] = "RST";
    /**
     * @generated from enum value: LANGUAGE_OCAML = 55;
     */
    Language[Language["OCAML"] = 55] = "OCAML";
    /**
     * @generated from enum value: LANGUAGE_CMAKE = 56;
     */
    Language[Language["CMAKE"] = 56] = "CMAKE";
    /**
     * @generated from enum value: LANGUAGE_PASCAL = 57;
     */
    Language[Language["PASCAL"] = 57] = "PASCAL";
    /**
     * @generated from enum value: LANGUAGE_ELIXIR = 58;
     */
    Language[Language["ELIXIR"] = 58] = "ELIXIR";
    /**
     * @generated from enum value: LANGUAGE_FSHARP = 59;
     */
    Language[Language["FSHARP"] = 59] = "FSHARP";
    /**
     * @generated from enum value: LANGUAGE_LISP = 60;
     */
    Language[Language["LISP"] = 60] = "LISP";
    /**
     * @generated from enum value: LANGUAGE_MATLAB = 61;
     */
    Language[Language["MATLAB"] = 61] = "MATLAB";
    /**
     * @generated from enum value: LANGUAGE_POWERSHELL = 62;
     */
    Language[Language["POWERSHELL"] = 62] = "POWERSHELL";
    /**
     * @generated from enum value: LANGUAGE_SOLIDITY = 63;
     */
    Language[Language["SOLIDITY"] = 63] = "SOLIDITY";
    /**
     * @generated from enum value: LANGUAGE_ADA = 64;
     */
    Language[Language["ADA"] = 64] = "ADA";
    /**
     * @generated from enum value: LANGUAGE_OCAML_INTERFACE = 65;
     */
    Language[Language["OCAML_INTERFACE"] = 65] = "OCAML_INTERFACE";
})(Language || (Language = {}));
// Retrieve enum metadata with: proto3.getEnumType(Language)
proto3.util.setEnumType(Language, "exa.codeium_common_pb.Language", [
    { no: 0, name: "LANGUAGE_UNSPECIFIED" },
    { no: 1, name: "LANGUAGE_C" },
    { no: 2, name: "LANGUAGE_CLOJURE" },
    { no: 3, name: "LANGUAGE_COFFEESCRIPT" },
    { no: 4, name: "LANGUAGE_CPP" },
    { no: 5, name: "LANGUAGE_CSHARP" },
    { no: 6, name: "LANGUAGE_CSS" },
    { no: 7, name: "LANGUAGE_CUDACPP" },
    { no: 8, name: "LANGUAGE_DOCKERFILE" },
    { no: 9, name: "LANGUAGE_GO" },
    { no: 10, name: "LANGUAGE_GROOVY" },
    { no: 11, name: "LANGUAGE_HANDLEBARS" },
    { no: 12, name: "LANGUAGE_HASKELL" },
    { no: 13, name: "LANGUAGE_HCL" },
    { no: 14, name: "LANGUAGE_HTML" },
    { no: 15, name: "LANGUAGE_INI" },
    { no: 16, name: "LANGUAGE_JAVA" },
    { no: 17, name: "LANGUAGE_JAVASCRIPT" },
    { no: 18, name: "LANGUAGE_JSON" },
    { no: 19, name: "LANGUAGE_JULIA" },
    { no: 20, name: "LANGUAGE_KOTLIN" },
    { no: 21, name: "LANGUAGE_LATEX" },
    { no: 22, name: "LANGUAGE_LESS" },
    { no: 23, name: "LANGUAGE_LUA" },
    { no: 24, name: "LANGUAGE_MAKEFILE" },
    { no: 25, name: "LANGUAGE_MARKDOWN" },
    { no: 26, name: "LANGUAGE_OBJECTIVEC" },
    { no: 27, name: "LANGUAGE_OBJECTIVECPP" },
    { no: 28, name: "LANGUAGE_PERL" },
    { no: 29, name: "LANGUAGE_PHP" },
    { no: 30, name: "LANGUAGE_PLAINTEXT" },
    { no: 31, name: "LANGUAGE_PROTOBUF" },
    { no: 32, name: "LANGUAGE_PBTXT" },
    { no: 33, name: "LANGUAGE_PYTHON" },
    { no: 34, name: "LANGUAGE_R" },
    { no: 35, name: "LANGUAGE_RUBY" },
    { no: 36, name: "LANGUAGE_RUST" },
    { no: 37, name: "LANGUAGE_SASS" },
    { no: 38, name: "LANGUAGE_SCALA" },
    { no: 39, name: "LANGUAGE_SCSS" },
    { no: 40, name: "LANGUAGE_SHELL" },
    { no: 41, name: "LANGUAGE_SQL" },
    { no: 42, name: "LANGUAGE_STARLARK" },
    { no: 43, name: "LANGUAGE_SWIFT" },
    { no: 44, name: "LANGUAGE_TSX" },
    { no: 45, name: "LANGUAGE_TYPESCRIPT" },
    { no: 46, name: "LANGUAGE_VISUALBASIC" },
    { no: 47, name: "LANGUAGE_VUE" },
    { no: 48, name: "LANGUAGE_XML" },
    { no: 49, name: "LANGUAGE_XSL" },
    { no: 50, name: "LANGUAGE_YAML" },
    { no: 51, name: "LANGUAGE_SVELTE" },
    { no: 52, name: "LANGUAGE_TOML" },
    { no: 53, name: "LANGUAGE_DART" },
    { no: 54, name: "LANGUAGE_RST" },
    { no: 55, name: "LANGUAGE_OCAML" },
    { no: 56, name: "LANGUAGE_CMAKE" },
    { no: 57, name: "LANGUAGE_PASCAL" },
    { no: 58, name: "LANGUAGE_ELIXIR" },
    { no: 59, name: "LANGUAGE_FSHARP" },
    { no: 60, name: "LANGUAGE_LISP" },
    { no: 61, name: "LANGUAGE_MATLAB" },
    { no: 62, name: "LANGUAGE_POWERSHELL" },
    { no: 63, name: "LANGUAGE_SOLIDITY" },
    { no: 64, name: "LANGUAGE_ADA" },
    { no: 65, name: "LANGUAGE_OCAML_INTERFACE" },
]);
/**
 * Next ID: 12, Previous field: entropy.
 *
 * @generated from message exa.codeium_common_pb.Completion
 */
class Completion extends Message {
    constructor(data) {
        super();
        /**
         * @generated from field: string completion_id = 1;
         */
        this.completionId = "";
        /**
         * @generated from field: string text = 2;
         */
        this.text = "";
        /**
         * @generated from field: string prefix = 3;
         */
        this.prefix = "";
        /**
         * @generated from field: string stop = 4;
         */
        this.stop = "";
        /**
         * @generated from field: double score = 5;
         */
        this.score = 0;
        /**
         * @generated from field: repeated uint64 tokens = 6;
         */
        this.tokens = [];
        /**
         * @generated from field: repeated string decoded_tokens = 7;
         */
        this.decodedTokens = [];
        /**
         * @generated from field: repeated double probabilities = 8;
         */
        this.probabilities = [];
        /**
         * @generated from field: repeated double adjusted_probabilities = 9;
         */
        this.adjustedProbabilities = [];
        /**
         * @generated from field: uint64 generated_length = 10;
         */
        this.generatedLength = protoInt64.zero;
        proto3.util.initPartial(data, this);
    }
    static fromBinary(bytes, options) {
        return new Completion().fromBinary(bytes, options);
    }
    static fromJson(jsonValue, options) {
        return new Completion().fromJson(jsonValue, options);
    }
    static fromJsonString(jsonString, options) {
        return new Completion().fromJsonString(jsonString, options);
    }
    static equals(a, b) {
        return proto3.util.equals(Completion, a, b);
    }
}
Completion.runtime = proto3;
Completion.typeName = "exa.codeium_common_pb.Completion";
Completion.fields = proto3.util.newFieldList(() => [
    { no: 1, name: "completion_id", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "text", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 3, name: "prefix", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 4, name: "stop", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 5, name: "score", kind: "scalar", T: 1 /* ScalarType.DOUBLE */ },
    { no: 6, name: "tokens", kind: "scalar", T: 4 /* ScalarType.UINT64 */, repeated: true },
    { no: 7, name: "decoded_tokens", kind: "scalar", T: 9 /* ScalarType.STRING */, repeated: true },
    { no: 8, name: "probabilities", kind: "scalar", T: 1 /* ScalarType.DOUBLE */, repeated: true },
    { no: 9, name: "adjusted_probabilities", kind: "scalar", T: 1 /* ScalarType.DOUBLE */, repeated: true },
    { no: 10, name: "generated_length", kind: "scalar", T: 4 /* ScalarType.UINT64 */ },
]);
/**
 * Next ID: 15, Previous field: url.
 *
 * @generated from message exa.codeium_common_pb.Metadata
 */
class Metadata extends Message {
    constructor(data) {
        super();
        /**
         * @generated from field: string ide_name = 1;
         */
        this.ideName = "";
        /**
         * @generated from field: string ide_version = 7;
         */
        this.ideVersion = "";
        /**
         * @generated from field: string extension_name = 12;
         */
        this.extensionName = "";
        /**
         * @generated from field: string extension_version = 2;
         */
        this.extensionVersion = "";
        /**
         * @generated from field: string api_key = 3;
         */
        this.apiKey = "";
        /**
         * Regex derived from https://stackoverflow.com/a/48300605.
         * TODO(prem): Should this be mandatory?
         *
         * @generated from field: string locale = 4;
         */
        this.locale = "";
        /**
         * UID identifying a single session for the given user.
         *
         * @generated from field: string session_id = 10;
         */
        this.sessionId = "";
        /**
         * Used purely in language server to cancel in flight requests.
         * If request_id is 0, then the request is not cancelable.
         * This should be a strictly monotonically increasing number
         * for the duration of a session.
         *
         * @generated from field: uint64 request_id = 9;
         */
        this.requestId = protoInt64.zero;
        /**
         * Browser-specific information.
         *
         * @generated from field: string user_agent = 13;
         */
        this.userAgent = "";
        /**
         * @generated from field: string url = 14;
         */
        this.url = "";
        /**
         * Authentication source information.
         *
         * @generated from field: exa.codeium_common_pb.AuthSource auth_source = 15;
         */
        this.authSource = AuthSource.CODEIUM;
        proto3.util.initPartial(data, this);
    }
    static fromBinary(bytes, options) {
        return new Metadata().fromBinary(bytes, options);
    }
    static fromJson(jsonValue, options) {
        return new Metadata().fromJson(jsonValue, options);
    }
    static fromJsonString(jsonString, options) {
        return new Metadata().fromJsonString(jsonString, options);
    }
    static equals(a, b) {
        return proto3.util.equals(Metadata, a, b);
    }
}
Metadata.runtime = proto3;
Metadata.typeName = "exa.codeium_common_pb.Metadata";
Metadata.fields = proto3.util.newFieldList(() => [
    { no: 1, name: "ide_name", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 7, name: "ide_version", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 12, name: "extension_name", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "extension_version", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 3, name: "api_key", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 4, name: "locale", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 10, name: "session_id", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 9, name: "request_id", kind: "scalar", T: 4 /* ScalarType.UINT64 */ },
    { no: 13, name: "user_agent", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 14, name: "url", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 15, name: "auth_source", kind: "enum", T: proto3.getEnumType(AuthSource) },
]);
/**
 * Next ID: 3, Previous field: insert_spaces.
 *
 * @generated from message exa.codeium_common_pb.EditorOptions
 */
class EditorOptions extends Message {
    constructor(data) {
        super();
        /**
         * @generated from field: uint64 tab_size = 1;
         */
        this.tabSize = protoInt64.zero;
        /**
         * @generated from field: bool insert_spaces = 2;
         */
        this.insertSpaces = false;
        proto3.util.initPartial(data, this);
    }
    static fromBinary(bytes, options) {
        return new EditorOptions().fromBinary(bytes, options);
    }
    static fromJson(jsonValue, options) {
        return new EditorOptions().fromJson(jsonValue, options);
    }
    static fromJsonString(jsonString, options) {
        return new EditorOptions().fromJsonString(jsonString, options);
    }
    static equals(a, b) {
        return proto3.util.equals(EditorOptions, a, b);
    }
}
EditorOptions.runtime = proto3;
EditorOptions.typeName = "exa.codeium_common_pb.EditorOptions";
EditorOptions.fields = proto3.util.newFieldList(() => [
    { no: 1, name: "tab_size", kind: "scalar", T: 4 /* ScalarType.UINT64 */ },
    { no: 2, name: "insert_spaces", kind: "scalar", T: 8 /* ScalarType.BOOL */ },
]);
/**
 * @generated from message exa.codeium_common_pb.Event
 */
class Event extends Message {
    constructor(data) {
        super();
        /**
         * @generated from field: exa.codeium_common_pb.EventType event_type = 1;
         */
        this.eventType = EventType.UNSPECIFIED;
        /**
         * @generated from field: string event_json = 2;
         */
        this.eventJson = "";
        /**
         * @generated from field: int64 timestamp_unix_ms = 3;
         */
        this.timestampUnixMs = protoInt64.zero;
        proto3.util.initPartial(data, this);
    }
    static fromBinary(bytes, options) {
        return new Event().fromBinary(bytes, options);
    }
    static fromJson(jsonValue, options) {
        return new Event().fromJson(jsonValue, options);
    }
    static fromJsonString(jsonString, options) {
        return new Event().fromJsonString(jsonString, options);
    }
    static equals(a, b) {
        return proto3.util.equals(Event, a, b);
    }
}
Event.runtime = proto3;
Event.typeName = "exa.codeium_common_pb.Event";
Event.fields = proto3.util.newFieldList(() => [
    { no: 1, name: "event_type", kind: "enum", T: proto3.getEnumType(EventType) },
    { no: 2, name: "event_json", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 3, name: "timestamp_unix_ms", kind: "scalar", T: 3 /* ScalarType.INT64 */ },
]);

// Copyright Exafunction, Inc.
/**
 * @generated from enum exa.language_server_pb.CodeiumState
 */
var CodeiumState;
(function (CodeiumState) {
    /**
     * @generated from enum value: CODEIUM_STATE_UNSPECIFIED = 0;
     */
    CodeiumState[CodeiumState["UNSPECIFIED"] = 0] = "UNSPECIFIED";
    /**
     * @generated from enum value: CODEIUM_STATE_INACTIVE = 1;
     */
    CodeiumState[CodeiumState["INACTIVE"] = 1] = "INACTIVE";
    /**
     * @generated from enum value: CODEIUM_STATE_PROCESSING = 2;
     */
    CodeiumState[CodeiumState["PROCESSING"] = 2] = "PROCESSING";
    /**
     * @generated from enum value: CODEIUM_STATE_SUCCESS = 3;
     */
    CodeiumState[CodeiumState["SUCCESS"] = 3] = "SUCCESS";
    /**
     * @generated from enum value: CODEIUM_STATE_WARNING = 4;
     */
    CodeiumState[CodeiumState["WARNING"] = 4] = "WARNING";
    /**
     * @generated from enum value: CODEIUM_STATE_ERROR = 5;
     */
    CodeiumState[CodeiumState["ERROR"] = 5] = "ERROR";
})(CodeiumState || (CodeiumState = {}));
// Retrieve enum metadata with: proto3.getEnumType(CodeiumState)
proto3.util.setEnumType(CodeiumState, "exa.language_server_pb.CodeiumState", [
    { no: 0, name: "CODEIUM_STATE_UNSPECIFIED" },
    { no: 1, name: "CODEIUM_STATE_INACTIVE" },
    { no: 2, name: "CODEIUM_STATE_PROCESSING" },
    { no: 3, name: "CODEIUM_STATE_SUCCESS" },
    { no: 4, name: "CODEIUM_STATE_WARNING" },
    { no: 5, name: "CODEIUM_STATE_ERROR" },
]);
/**
 * @generated from enum exa.language_server_pb.LineType
 */
var LineType;
(function (LineType) {
    /**
     * @generated from enum value: LINE_TYPE_UNSPECIFIED = 0;
     */
    LineType[LineType["UNSPECIFIED"] = 0] = "UNSPECIFIED";
    /**
     * @generated from enum value: LINE_TYPE_SINGLE = 1;
     */
    LineType[LineType["SINGLE"] = 1] = "SINGLE";
    /**
     * @generated from enum value: LINE_TYPE_MULTI = 2;
     */
    LineType[LineType["MULTI"] = 2] = "MULTI";
})(LineType || (LineType = {}));
// Retrieve enum metadata with: proto3.getEnumType(LineType)
proto3.util.setEnumType(LineType, "exa.language_server_pb.LineType", [
    { no: 0, name: "LINE_TYPE_UNSPECIFIED" },
    { no: 1, name: "LINE_TYPE_SINGLE" },
    { no: 2, name: "LINE_TYPE_MULTI" },
]);
/**
 * @generated from enum exa.language_server_pb.CompletionPartType
 */
var CompletionPartType;
(function (CompletionPartType) {
    /**
     * @generated from enum value: COMPLETION_PART_TYPE_UNSPECIFIED = 0;
     */
    CompletionPartType[CompletionPartType["UNSPECIFIED"] = 0] = "UNSPECIFIED";
    /**
     * Single-line completion parts that appear within an existing line of text.
     *
     * @generated from enum value: COMPLETION_PART_TYPE_INLINE = 1;
     */
    CompletionPartType[CompletionPartType["INLINE"] = 1] = "INLINE";
    /**
     * Possibly multi-line completion parts that appear below an existing line of text.
     *
     * @generated from enum value: COMPLETION_PART_TYPE_BLOCK = 2;
     */
    CompletionPartType[CompletionPartType["BLOCK"] = 2] = "BLOCK";
    /**
     * Like COMPLETION_PART_TYPE_INLINE, but overwrites the existing text.
     *
     * @generated from enum value: COMPLETION_PART_TYPE_INLINE_MASK = 3;
     */
    CompletionPartType[CompletionPartType["INLINE_MASK"] = 3] = "INLINE_MASK";
})(CompletionPartType || (CompletionPartType = {}));
// Retrieve enum metadata with: proto3.getEnumType(CompletionPartType)
proto3.util.setEnumType(CompletionPartType, "exa.language_server_pb.CompletionPartType", [
    { no: 0, name: "COMPLETION_PART_TYPE_UNSPECIFIED" },
    { no: 1, name: "COMPLETION_PART_TYPE_INLINE" },
    { no: 2, name: "COMPLETION_PART_TYPE_BLOCK" },
    { no: 3, name: "COMPLETION_PART_TYPE_INLINE_MASK" },
]);
/**
 * @generated from message exa.language_server_pb.MultilineConfig
 */
class MultilineConfig extends Message {
    constructor(data) {
        super();
        /**
         * Multiline model threshold. 0-1, higher = more single line, lower = more multiline,
         * 0.0 = only_multiline, default is 0.5
         *
         * @generated from field: float threshold = 1;
         */
        this.threshold = 0;
        proto3.util.initPartial(data, this);
    }
    static fromBinary(bytes, options) {
        return new MultilineConfig().fromBinary(bytes, options);
    }
    static fromJson(jsonValue, options) {
        return new MultilineConfig().fromJson(jsonValue, options);
    }
    static fromJsonString(jsonString, options) {
        return new MultilineConfig().fromJsonString(jsonString, options);
    }
    static equals(a, b) {
        return proto3.util.equals(MultilineConfig, a, b);
    }
}
MultilineConfig.runtime = proto3;
MultilineConfig.typeName = "exa.language_server_pb.MultilineConfig";
MultilineConfig.fields = proto3.util.newFieldList(() => [
    { no: 1, name: "threshold", kind: "scalar", T: 2 /* ScalarType.FLOAT */ },
]);
/**
 * Next ID: 9, Previous field: disable_cache.
 *
 * @generated from message exa.language_server_pb.GetCompletionsRequest
 */
class GetCompletionsRequest extends Message {
    constructor(data) {
        super();
        /**
         * @generated from field: repeated exa.language_server_pb.Document other_documents = 5;
         */
        this.otherDocuments = [];
        /**
         * @generated from field: string model_name = 10;
         */
        this.modelName = "";
        proto3.util.initPartial(data, this);
    }
    static fromBinary(bytes, options) {
        return new GetCompletionsRequest().fromBinary(bytes, options);
    }
    static fromJson(jsonValue, options) {
        return new GetCompletionsRequest().fromJson(jsonValue, options);
    }
    static fromJsonString(jsonString, options) {
        return new GetCompletionsRequest().fromJsonString(jsonString, options);
    }
    static equals(a, b) {
        return proto3.util.equals(GetCompletionsRequest, a, b);
    }
}
GetCompletionsRequest.runtime = proto3;
GetCompletionsRequest.typeName = "exa.language_server_pb.GetCompletionsRequest";
GetCompletionsRequest.fields = proto3.util.newFieldList(() => [
    { no: 1, name: "metadata", kind: "message", T: Metadata },
    { no: 2, name: "document", kind: "message", T: Document$1 },
    { no: 3, name: "editor_options", kind: "message", T: EditorOptions },
    { no: 5, name: "other_documents", kind: "message", T: Document$1, repeated: true },
    { no: 7, name: "experiment_config", kind: "message", T: ExperimentConfig },
    { no: 10, name: "model_name", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 13, name: "multiline_config", kind: "message", T: MultilineConfig },
]);
/**
 * Next ID: 5, Previous field: latency_info.
 *
 * @generated from message exa.language_server_pb.GetCompletionsResponse
 */
class GetCompletionsResponse extends Message {
    constructor(data) {
        super();
        /**
         * @generated from field: repeated exa.language_server_pb.CompletionItem completion_items = 2;
         */
        this.completionItems = [];
        proto3.util.initPartial(data, this);
    }
    static fromBinary(bytes, options) {
        return new GetCompletionsResponse().fromBinary(bytes, options);
    }
    static fromJson(jsonValue, options) {
        return new GetCompletionsResponse().fromJson(jsonValue, options);
    }
    static fromJsonString(jsonString, options) {
        return new GetCompletionsResponse().fromJsonString(jsonString, options);
    }
    static equals(a, b) {
        return proto3.util.equals(GetCompletionsResponse, a, b);
    }
}
GetCompletionsResponse.runtime = proto3;
GetCompletionsResponse.typeName = "exa.language_server_pb.GetCompletionsResponse";
GetCompletionsResponse.fields = proto3.util.newFieldList(() => [
    { no: 1, name: "state", kind: "message", T: State },
    { no: 2, name: "completion_items", kind: "message", T: CompletionItem, repeated: true },
]);
/**
 * Next ID: 3, Previous field: completion_id.
 *
 * @generated from message exa.language_server_pb.AcceptCompletionRequest
 */
class AcceptCompletionRequest extends Message {
    constructor(data) {
        super();
        /**
         * @generated from field: string completion_id = 2;
         */
        this.completionId = "";
        proto3.util.initPartial(data, this);
    }
    static fromBinary(bytes, options) {
        return new AcceptCompletionRequest().fromBinary(bytes, options);
    }
    static fromJson(jsonValue, options) {
        return new AcceptCompletionRequest().fromJson(jsonValue, options);
    }
    static fromJsonString(jsonString, options) {
        return new AcceptCompletionRequest().fromJsonString(jsonString, options);
    }
    static equals(a, b) {
        return proto3.util.equals(AcceptCompletionRequest, a, b);
    }
}
AcceptCompletionRequest.runtime = proto3;
AcceptCompletionRequest.typeName = "exa.language_server_pb.AcceptCompletionRequest";
AcceptCompletionRequest.fields = proto3.util.newFieldList(() => [
    { no: 1, name: "metadata", kind: "message", T: Metadata },
    { no: 2, name: "completion_id", kind: "scalar", T: 9 /* ScalarType.STRING */ },
]);
/**
 * Next ID: 1, Previous field: N/A.
 *
 * @generated from message exa.language_server_pb.AcceptCompletionResponse
 */
class AcceptCompletionResponse extends Message {
    constructor(data) {
        super();
        proto3.util.initPartial(data, this);
    }
    static fromBinary(bytes, options) {
        return new AcceptCompletionResponse().fromBinary(bytes, options);
    }
    static fromJson(jsonValue, options) {
        return new AcceptCompletionResponse().fromJson(jsonValue, options);
    }
    static fromJsonString(jsonString, options) {
        return new AcceptCompletionResponse().fromJsonString(jsonString, options);
    }
    static equals(a, b) {
        return proto3.util.equals(AcceptCompletionResponse, a, b);
    }
}
AcceptCompletionResponse.runtime = proto3;
AcceptCompletionResponse.typeName = "exa.language_server_pb.AcceptCompletionResponse";
AcceptCompletionResponse.fields = proto3.util.newFieldList(() => []);
/**
 * Next ID: 1, Previous field: N/A.
 *
 * @generated from message exa.language_server_pb.GetAuthTokenRequest
 */
class GetAuthTokenRequest extends Message {
    constructor(data) {
        super();
        proto3.util.initPartial(data, this);
    }
    static fromBinary(bytes, options) {
        return new GetAuthTokenRequest().fromBinary(bytes, options);
    }
    static fromJson(jsonValue, options) {
        return new GetAuthTokenRequest().fromJson(jsonValue, options);
    }
    static fromJsonString(jsonString, options) {
        return new GetAuthTokenRequest().fromJsonString(jsonString, options);
    }
    static equals(a, b) {
        return proto3.util.equals(GetAuthTokenRequest, a, b);
    }
}
GetAuthTokenRequest.runtime = proto3;
GetAuthTokenRequest.typeName = "exa.language_server_pb.GetAuthTokenRequest";
GetAuthTokenRequest.fields = proto3.util.newFieldList(() => []);
/**
 * Next ID: 3, Previous field: uuid.
 *
 * @generated from message exa.language_server_pb.GetAuthTokenResponse
 */
class GetAuthTokenResponse extends Message {
    constructor(data) {
        super();
        /**
         * @generated from field: string auth_token = 1;
         */
        this.authToken = "";
        /**
         * @generated from field: string uuid = 2;
         */
        this.uuid = "";
        proto3.util.initPartial(data, this);
    }
    static fromBinary(bytes, options) {
        return new GetAuthTokenResponse().fromBinary(bytes, options);
    }
    static fromJson(jsonValue, options) {
        return new GetAuthTokenResponse().fromJson(jsonValue, options);
    }
    static fromJsonString(jsonString, options) {
        return new GetAuthTokenResponse().fromJsonString(jsonString, options);
    }
    static equals(a, b) {
        return proto3.util.equals(GetAuthTokenResponse, a, b);
    }
}
GetAuthTokenResponse.runtime = proto3;
GetAuthTokenResponse.typeName = "exa.language_server_pb.GetAuthTokenResponse";
GetAuthTokenResponse.fields = proto3.util.newFieldList(() => [
    { no: 1, name: "auth_token", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "uuid", kind: "scalar", T: 9 /* ScalarType.STRING */ },
]);
/**
 * @generated from message exa.language_server_pb.DocumentPosition
 */
class DocumentPosition extends Message {
    constructor(data) {
        super();
        /**
         * 0-indexed. Measured in UTF-8 bytes.
         *
         * @generated from field: uint64 row = 1;
         */
        this.row = protoInt64.zero;
        /**
         * 0-indexed. Measured in UTF-8 bytes.
         *
         * @generated from field: uint64 col = 2;
         */
        this.col = protoInt64.zero;
        proto3.util.initPartial(data, this);
    }
    static fromBinary(bytes, options) {
        return new DocumentPosition().fromBinary(bytes, options);
    }
    static fromJson(jsonValue, options) {
        return new DocumentPosition().fromJson(jsonValue, options);
    }
    static fromJsonString(jsonString, options) {
        return new DocumentPosition().fromJsonString(jsonString, options);
    }
    static equals(a, b) {
        return proto3.util.equals(DocumentPosition, a, b);
    }
}
DocumentPosition.runtime = proto3;
DocumentPosition.typeName = "exa.language_server_pb.DocumentPosition";
DocumentPosition.fields = proto3.util.newFieldList(() => [
    { no: 1, name: "row", kind: "scalar", T: 4 /* ScalarType.UINT64 */ },
    { no: 2, name: "col", kind: "scalar", T: 4 /* ScalarType.UINT64 */ },
]);
/**
 * Next ID: 9, Previous field: cursor_position.
 *
 * @generated from message exa.language_server_pb.Document
 */
let Document$1 = class Document extends Message {
    constructor(data) {
        super();
        /**
         * @generated from field: string absolute_path = 1;
         */
        this.absolutePath = "";
        /**
         * Path relative to the root of the workspace.
         *
         * @generated from field: string relative_path = 2;
         */
        this.relativePath = "";
        /**
         * @generated from field: string text = 3;
         */
        this.text = "";
        /**
         * Language ID provided by the editor.
         *
         * @generated from field: string editor_language = 4;
         */
        this.editorLanguage = "";
        /**
         * Language enum standardized across editors.
         *
         * @generated from field: exa.codeium_common_pb.Language language = 5;
         */
        this.language = Language.UNSPECIFIED;
        /**
         * Measured in number of UTF-8 bytes.
         *
         * @generated from field: uint64 cursor_offset = 6;
         */
        this.cursorOffset = protoInt64.zero;
        /**
         * \n or \r\n, if known.
         *
         * @generated from field: string line_ending = 7;
         */
        this.lineEnding = "";
        proto3.util.initPartial(data, this);
    }
    static fromBinary(bytes, options) {
        return new Document().fromBinary(bytes, options);
    }
    static fromJson(jsonValue, options) {
        return new Document().fromJson(jsonValue, options);
    }
    static fromJsonString(jsonString, options) {
        return new Document().fromJsonString(jsonString, options);
    }
    static equals(a, b) {
        return proto3.util.equals(Document, a, b);
    }
};
Document$1.runtime = proto3;
Document$1.typeName = "exa.language_server_pb.Document";
Document$1.fields = proto3.util.newFieldList(() => [
    { no: 1, name: "absolute_path", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "relative_path", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 3, name: "text", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 4, name: "editor_language", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 5, name: "language", kind: "enum", T: proto3.getEnumType(Language) },
    { no: 6, name: "cursor_offset", kind: "scalar", T: 4 /* ScalarType.UINT64 */ },
    { no: 8, name: "cursor_position", kind: "message", T: DocumentPosition },
    { no: 7, name: "line_ending", kind: "scalar", T: 9 /* ScalarType.STRING */ },
]);
/**
 * @generated from message exa.language_server_pb.ExperimentConfig
 */
class ExperimentConfig extends Message {
    constructor(data) {
        super();
        /**
         * @generated from field: repeated exa.codeium_common_pb.ExperimentKey force_enable_experiments = 1;
         */
        this.forceEnableExperiments = [];
        proto3.util.initPartial(data, this);
    }
    static fromBinary(bytes, options) {
        return new ExperimentConfig().fromBinary(bytes, options);
    }
    static fromJson(jsonValue, options) {
        return new ExperimentConfig().fromJson(jsonValue, options);
    }
    static fromJsonString(jsonString, options) {
        return new ExperimentConfig().fromJsonString(jsonString, options);
    }
    static equals(a, b) {
        return proto3.util.equals(ExperimentConfig, a, b);
    }
}
ExperimentConfig.runtime = proto3;
ExperimentConfig.typeName = "exa.language_server_pb.ExperimentConfig";
ExperimentConfig.fields = proto3.util.newFieldList(() => [
    { no: 1, name: "force_enable_experiments", kind: "enum", T: proto3.getEnumType(ExperimentKey), repeated: true },
]);
/**
 * Next ID: 3, Previous field: message.
 *
 * @generated from message exa.language_server_pb.State
 */
class State extends Message {
    constructor(data) {
        super();
        /**
         * @generated from field: exa.language_server_pb.CodeiumState state = 1;
         */
        this.state = CodeiumState.UNSPECIFIED;
        /**
         * @generated from field: string message = 2;
         */
        this.message = "";
        proto3.util.initPartial(data, this);
    }
    static fromBinary(bytes, options) {
        return new State().fromBinary(bytes, options);
    }
    static fromJson(jsonValue, options) {
        return new State().fromJson(jsonValue, options);
    }
    static fromJsonString(jsonString, options) {
        return new State().fromJsonString(jsonString, options);
    }
    static equals(a, b) {
        return proto3.util.equals(State, a, b);
    }
}
State.runtime = proto3;
State.typeName = "exa.language_server_pb.State";
State.fields = proto3.util.newFieldList(() => [
    { no: 1, name: "state", kind: "enum", T: proto3.getEnumType(CodeiumState) },
    { no: 2, name: "message", kind: "scalar", T: 9 /* ScalarType.STRING */ },
]);
/**
 * Next ID: 5, Previous field: end_position.
 *
 * @generated from message exa.language_server_pb.Range
 */
let Range$1 = class Range extends Message {
    constructor(data) {
        super();
        /**
         * @generated from field: uint64 start_offset = 1;
         */
        this.startOffset = protoInt64.zero;
        /**
         * @generated from field: uint64 end_offset = 2;
         */
        this.endOffset = protoInt64.zero;
        proto3.util.initPartial(data, this);
    }
    static fromBinary(bytes, options) {
        return new Range().fromBinary(bytes, options);
    }
    static fromJson(jsonValue, options) {
        return new Range().fromJson(jsonValue, options);
    }
    static fromJsonString(jsonString, options) {
        return new Range().fromJsonString(jsonString, options);
    }
    static equals(a, b) {
        return proto3.util.equals(Range, a, b);
    }
};
Range$1.runtime = proto3;
Range$1.typeName = "exa.language_server_pb.Range";
Range$1.fields = proto3.util.newFieldList(() => [
    { no: 1, name: "start_offset", kind: "scalar", T: 4 /* ScalarType.UINT64 */ },
    { no: 2, name: "end_offset", kind: "scalar", T: 4 /* ScalarType.UINT64 */ },
    { no: 3, name: "start_position", kind: "message", T: DocumentPosition },
    { no: 4, name: "end_position", kind: "message", T: DocumentPosition },
]);
/**
 * @generated from message exa.language_server_pb.Suffix
 */
class Suffix extends Message {
    constructor(data) {
        super();
        /**
         * Text to insert after the cursor when accepting the completion.
         *
         * @generated from field: string text = 1;
         */
        this.text = "";
        /**
         * Cursor position delta (as signed offset) from the end of the inserted
         * completion (including the suffix).
         *
         * @generated from field: int64 delta_cursor_offset = 2;
         */
        this.deltaCursorOffset = protoInt64.zero;
        proto3.util.initPartial(data, this);
    }
    static fromBinary(bytes, options) {
        return new Suffix().fromBinary(bytes, options);
    }
    static fromJson(jsonValue, options) {
        return new Suffix().fromJson(jsonValue, options);
    }
    static fromJsonString(jsonString, options) {
        return new Suffix().fromJsonString(jsonString, options);
    }
    static equals(a, b) {
        return proto3.util.equals(Suffix, a, b);
    }
}
Suffix.runtime = proto3;
Suffix.typeName = "exa.language_server_pb.Suffix";
Suffix.fields = proto3.util.newFieldList(() => [
    { no: 1, name: "text", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "delta_cursor_offset", kind: "scalar", T: 3 /* ScalarType.INT64 */ },
]);
/**
 * Represents a contiguous part of the completion text that is not
 * already in the document.
 * Next ID: 4, Previous field: prefix.
 *
 * @generated from message exa.language_server_pb.CompletionPart
 */
class CompletionPart extends Message {
    constructor(data) {
        super();
        /**
         * @generated from field: string text = 1;
         */
        this.text = "";
        /**
         * Offset in the original document where the part starts. For block
         * parts, this is always the end of the line before the block.
         *
         * @generated from field: uint64 offset = 2;
         */
        this.offset = protoInt64.zero;
        /**
         * @generated from field: exa.language_server_pb.CompletionPartType type = 3;
         */
        this.type = CompletionPartType.UNSPECIFIED;
        /**
         * The section of the original line that came before this part. Only valid for
         * COMPLETION_PART_TYPE_INLINE.
         *
         * @generated from field: string prefix = 4;
         */
        this.prefix = "";
        /**
         * In the case of COMPLETION_PART_TYPE_BLOCK, represents the line it is below.
         *
         * @generated from field: uint64 line = 5;
         */
        this.line = protoInt64.zero;
        proto3.util.initPartial(data, this);
    }
    static fromBinary(bytes, options) {
        return new CompletionPart().fromBinary(bytes, options);
    }
    static fromJson(jsonValue, options) {
        return new CompletionPart().fromJson(jsonValue, options);
    }
    static fromJsonString(jsonString, options) {
        return new CompletionPart().fromJsonString(jsonString, options);
    }
    static equals(a, b) {
        return proto3.util.equals(CompletionPart, a, b);
    }
}
CompletionPart.runtime = proto3;
CompletionPart.typeName = "exa.language_server_pb.CompletionPart";
CompletionPart.fields = proto3.util.newFieldList(() => [
    { no: 1, name: "text", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "offset", kind: "scalar", T: 4 /* ScalarType.UINT64 */ },
    { no: 3, name: "type", kind: "enum", T: proto3.getEnumType(CompletionPartType) },
    { no: 4, name: "prefix", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 5, name: "line", kind: "scalar", T: 4 /* ScalarType.UINT64 */ },
]);
/**
 * Next ID: 9, Previous field: completion_parts.
 *
 * @generated from message exa.language_server_pb.CompletionItem
 */
class CompletionItem extends Message {
    constructor(data) {
        super();
        /**
         * @generated from field: exa.codeium_common_pb.CompletionSource source = 3;
         */
        this.source = CompletionSource.UNSPECIFIED;
        /**
         * @generated from field: repeated exa.language_server_pb.CompletionPart completion_parts = 8;
         */
        this.completionParts = [];
        proto3.util.initPartial(data, this);
    }
    static fromBinary(bytes, options) {
        return new CompletionItem().fromBinary(bytes, options);
    }
    static fromJson(jsonValue, options) {
        return new CompletionItem().fromJson(jsonValue, options);
    }
    static fromJsonString(jsonString, options) {
        return new CompletionItem().fromJsonString(jsonString, options);
    }
    static equals(a, b) {
        return proto3.util.equals(CompletionItem, a, b);
    }
}
CompletionItem.runtime = proto3;
CompletionItem.typeName = "exa.language_server_pb.CompletionItem";
CompletionItem.fields = proto3.util.newFieldList(() => [
    { no: 1, name: "completion", kind: "message", T: Completion },
    { no: 5, name: "suffix", kind: "message", T: Suffix },
    { no: 2, name: "range", kind: "message", T: Range$1 },
    { no: 3, name: "source", kind: "enum", T: proto3.getEnumType(CompletionSource) },
    { no: 8, name: "completion_parts", kind: "message", T: CompletionPart, repeated: true },
]);

// Copyright Exafunction, Inc.
// @generated by protoc-gen-connect-es v1.1.3 with parameter "target=ts,import_extension=none"
// @generated from file exa/language_server_pb/language_server.proto (package exa.language_server_pb, syntax proto3)
/* eslint-disable */
// @ts-nocheck
/**
 * @generated from service exa.language_server_pb.LanguageServerService
 */
const LanguageServerService = {
    typeName: "exa.language_server_pb.LanguageServerService",
    methods: {
        /**
         * @generated from rpc exa.language_server_pb.LanguageServerService.GetCompletions
         */
        getCompletions: {
            name: "GetCompletions",
            I: GetCompletionsRequest,
            O: GetCompletionsResponse,
            kind: MethodKind.Unary,
        },
        /**
         * @generated from rpc exa.language_server_pb.LanguageServerService.AcceptCompletion
         */
        acceptCompletion: {
            name: "AcceptCompletion",
            I: AcceptCompletionRequest,
            O: AcceptCompletionResponse,
            kind: MethodKind.Unary,
        },
        /**
         * @generated from rpc exa.language_server_pb.LanguageServerService.GetAuthToken
         */
        getAuthToken: {
            name: "GetAuthToken",
            I: GetAuthTokenRequest,
            O: GetAuthTokenResponse,
            kind: MethodKind.Unary,
        },
    }
};

class Position {
    constructor(line, character) {
        this.line = line;
        this.character = character;
        this.lineNumber = line + 1;
        this.column = character + 1;
    }
    static fromMonaco(position) {
        return new Position(position.lineNumber - 1, position.column - 1);
    }
    static fromPosition(position) {
        return new Position(position.line, position.character);
    }
}
class Range {
    constructor(start, end) {
        this.start = start;
        this.end = end;
        this.startLineNumber = start.line + 1;
        this.startColumn = start.character + 1;
        this.endLineNumber = end.line + 1;
        this.endColumn = end.character + 1;
    }
    static fromMonaco(range) {
        return new Range(new Position(range.startLineNumber - 1, range.startColumn - 1), new Position(range.endLineNumber - 1, range.endColumn - 1));
    }
    static fromRange(range) {
        return new Range(range.start, range.end);
    }
}

class Line {
    constructor(text, range) {
        this.text = text;
        this.range = range;
    }
}

class Document {
    constructor(model) {
        this.model = model;
        this.uri = model.uri;
        this.languageId = model.getLanguageId();
    }
    get lineCount() {
        return this.model.getLineCount();
    }
    lineAt(positionOrLine) {
        if (typeof positionOrLine !== 'number') {
            positionOrLine = positionOrLine.line;
        }
        return new Line(this.model.getLineContent(positionOrLine + 1), new Range(new Position(positionOrLine, 0), new Position(positionOrLine, this.model.getLineLength(positionOrLine + 1))));
    }
    offsetAt(position) {
        return this.model.getOffsetAt(Position.fromPosition(position));
    }
    positionAt(offset) {
        return Position.fromMonaco(this.model.getPositionAt(offset));
    }
    getText(range) {
        if (!range) {
            return this.model.getValue();
        }
        return this.model.getValueInRange(Range.fromRange(range));
    }
}

/**
 * Returns the number of UTF-8 bytes required to represent the given Unicode code point.
 *
 * @param {number} codePointValue - The Unicode code point value.
 * @return {number} The number of UTF-8 bytes needed to represent the code point.
 */
function numUtf8BytesForCodePoint(codePointValue) {
    if (codePointValue < 0x80) {
        return 1;
    }
    if (codePointValue < 0x800) {
        return 2;
    }
    if (codePointValue < 0x10000) {
        return 3;
    }
    return 4;
}
/**
 * Calculates for some prefix of the given text, how many bytes the UTF-8
 * representation would be. Undefined behavior if the number of code units
 * doesn't correspond to a valid UTF-8 sequence.
 * @param text - Text to examine.
 * @param numCodeUnits The number of code units to look at.
 * @returns The number of bytes.
 */
function numCodeUnitsToNumUtf8Bytes(text, numCodeUnits) {
    if (numCodeUnits === 0) {
        return 0;
    }
    let curNumUtf8Bytes = 0;
    let curNumCodeUnits = 0;
    for (const codePoint of text) {
        curNumCodeUnits += codePoint.length;
        curNumUtf8Bytes += numUtf8BytesForCodePoint(codePoint.codePointAt(0));
        if (numCodeUnits !== undefined && curNumCodeUnits >= numCodeUnits) {
            break;
        }
    }
    return curNumUtf8Bytes;
}
function numUtf8BytesToNumCodeUnits(text, numUtf8Bytes) {
    if (numUtf8Bytes === 0) {
        return 0;
    }
    let curNumCodeUnits = 0;
    let curNumUtf8Bytes = 0;
    for (const codePoint of text) {
        curNumUtf8Bytes += numUtf8BytesForCodePoint(codePoint.codePointAt(0));
        curNumCodeUnits += codePoint.length;
        if (numUtf8Bytes !== undefined && curNumUtf8Bytes >= numUtf8Bytes) {
            break;
        }
    }
    return curNumCodeUnits;
}

/**
 * Generates a random UUID.
 */
const uuid = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
        const r = (Math.random() * 16) | 0;
        const v = c === 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
};

/**
 * Get the current URL of the window. If this fails, a null string is returned.
 * @returns The current URL
 */
const getCurrentURL = () => {
    try {
        return window.location.href;
    }
    catch (e) {
        return null;
    }
};
/**
 * Get the current package version. If this fails, a null string is returned.
 */
const getPackageVersion = () => {
    try {
        // @ts-ignore
        return window.CODEIUM_REACT_CODE_VERSION ? window.CODEIUM_REACT_CODE_VERSION : null;
    }
    catch (e) {
        return null;
    }
};

/**
 * Converts a language ID to a strongly-typed enum value.
 */
const languageIdToEnum = (languageId) => {
    switch (languageId.toLowerCase()) {
        case 'c':
            return Language.C;
        case 'clojure':
            return Language.CLOJURE;
        case 'coffeescript':
            return Language.COFFEESCRIPT;
        case 'cpp':
            return Language.CPP;
        case 'csharp':
            return Language.CSHARP;
        case 'css':
            return Language.CSS;
        case 'cudacpp':
            return Language.CUDACPP;
        case 'dockerfile':
            return Language.DOCKERFILE;
        case 'go':
            return Language.GO;
        case 'groovy':
            return Language.GROOVY;
        case 'handlebars':
            return Language.HANDLEBARS;
        case 'haskell':
            return Language.HASKELL;
        case 'hcl':
            return Language.HCL;
        case 'html':
            return Language.HTML;
        case 'ini':
            return Language.INI;
        case 'java':
            return Language.JAVA;
        case 'javascript':
            return Language.JAVASCRIPT;
        case 'json':
            return Language.JSON;
        case 'julia':
            return Language.JULIA;
        case 'kotlin':
            return Language.KOTLIN;
        case 'latex':
            return Language.LATEX;
        case 'less':
            return Language.LESS;
        case 'lua':
            return Language.LUA;
        case 'makefile':
            return Language.MAKEFILE;
        case 'markdown':
            return Language.MARKDOWN;
        case 'objectivec':
            return Language.OBJECTIVEC;
        case 'objectivecpp':
            return Language.OBJECTIVECPP;
        case 'perl':
            return Language.PERL;
        case 'php':
            return Language.PHP;
        case 'plaintext':
            return Language.PLAINTEXT;
        case 'protobuf':
            return Language.PROTOBUF;
        case 'pbtxt':
            return Language.PBTXT;
        case 'python':
            return Language.PYTHON;
        case 'r':
            return Language.R;
        case 'ruby':
            return Language.RUBY;
        case 'rust':
            return Language.RUST;
        case 'sass':
            return Language.SASS;
        case 'scala':
            return Language.SCALA;
        case 'scss':
            return Language.SCSS;
        case 'shell':
            return Language.SHELL;
        case 'sql':
            return Language.SQL;
        case 'starlark':
            return Language.STARLARK;
        case 'swift':
            return Language.SWIFT;
        case 'tsx':
            return Language.TSX;
        case 'typescript':
            return Language.TYPESCRIPT;
        case 'visualbasic':
            return Language.VISUALBASIC;
        case 'vue':
            return Language.VUE;
        case 'xml':
            return Language.XML;
        case 'xsl':
            return Language.XSL;
        case 'yaml':
            return Language.YAML;
        case 'svelte':
            return Language.SVELTE;
        case 'toml':
            return Language.TOML;
        case 'dart':
            return Language.DART;
        case 'rst':
            return Language.RST;
        case 'ocaml':
            return Language.OCAML;
        case 'cmake':
            return Language.CMAKE;
        case 'pascal':
            return Language.PASCAL;
        case 'elixir':
            return Language.ELIXIR;
        case 'fsharp':
            return Language.FSHARP;
        case 'lisp':
            return Language.LISP;
        case 'matlab':
            return Language.MATLAB;
        case 'powershell':
            return Language.POWERSHELL;
        case 'solidity':
            return Language.SOLIDITY;
        case 'ada':
            return Language.ADA;
        case 'ocaml_interface':
            return Language.OCAML_INTERFACE;
        default:
            return Language.UNSPECIFIED;
    }
};

class MonacoInlineCompletion {
    constructor(insertText, range, completionId) {
        this.insertText = insertText;
        this.text = insertText;
        this.range = range;
        this.command = {
            id: 'codeium.acceptCompletion',
            title: 'Accept Completion',
            arguments: [completionId, insertText],
        };
    }
}
const EDITOR_API_KEY = 'd49954eb-cfba-4992-980f-d8fb37f0e942';
/**
 * CompletionProvider class for Codeium.
 */
class MonacoCompletionProvider {
    constructor(grpcClient, setStatus, setMessage, apiKey, multilineModelThreshold) {
        this.setStatus = setStatus;
        this.setMessage = setMessage;
        this.apiKey = apiKey;
        this.multilineModelThreshold = multilineModelThreshold;
        /**
         * A list of other documents to include as context in the prompt.
         */
        this.otherDocuments = [];
        this.sessionId = `react-editor-${uuid()}`;
        this.client = grpcClient;
    }
    getAuthHeader() {
        const metadata = this.getMetadata();
        const headers = {
            Authorization: `Basic ${metadata.apiKey}-${metadata.sessionId}`,
        };
        return headers;
    }
    getMetadata() {
        var _a, _b, _c;
        const metadata = new Metadata({
            ideName: 'web',
            ideVersion: (_a = getCurrentURL()) !== null && _a !== void 0 ? _a : 'unknown',
            extensionName: '@codeium/react-code-editor',
            extensionVersion: (_b = getPackageVersion()) !== null && _b !== void 0 ? _b : 'unknown',
            apiKey: (_c = this.apiKey) !== null && _c !== void 0 ? _c : EDITOR_API_KEY,
            sessionId: this.sessionId,
        });
        return metadata;
    }
    /**
     * Generate CompletionAndRanges.
     *
     * @param model - Monaco model.
     * @param token - Cancellation token.
     * @returns InlineCompletions or undefined
     */
    provideInlineCompletions(model, monacoPosition, token) {
        return __awaiter(this, void 0, void 0, function* () {
            const document = new Document(model);
            const position = Position.fromMonaco(monacoPosition);
            // Pre-register cancellation callback to get around bug in Monaco cancellation tokens breaking
            // after await.
            token.onCancellationRequested(() => { var _a; return (_a = token.cancellationCallback) === null || _a === void 0 ? void 0 : _a.call(token); });
            const abortController = new AbortController();
            token.onCancellationRequested(() => {
                abortController.abort();
            });
            const signal = abortController.signal;
            this.setStatus(Status.PROCESSING);
            this.setMessage('Generating completions...');
            const documentInfo = this.getDocumentInfo(document, position);
            const editorOptions = {
                tabSize: BigInt(model.getOptions().tabSize),
                insertSpaces: model.getOptions().insertSpaces,
            };
            let includedOtherDocs = this.otherDocuments;
            if (includedOtherDocs.length > 10) {
                console.warn(`Too many other documents: ${includedOtherDocs.length} (max 10)`);
                includedOtherDocs = includedOtherDocs.slice(0, 10);
            }
            let multilineConfig = undefined;
            if (this.multilineModelThreshold !== undefined) {
                multilineConfig = new MultilineConfig({
                    threshold: this.multilineModelThreshold,
                });
            }
            // Get completions.
            let getCompletionsResponse;
            try {
                getCompletionsResponse = yield this.client.getCompletions({
                    metadata: this.getMetadata(),
                    document: documentInfo,
                    editorOptions: editorOptions,
                    otherDocuments: includedOtherDocs,
                    multilineConfig,
                }, {
                    signal,
                    headers: this.getAuthHeader(),
                });
            }
            catch (err) {
                // Handle cancellation.
                if (err instanceof ConnectError && err.code === Code.Canceled) ;
                else {
                    this.setStatus(Status.ERROR);
                    this.setMessage('Something went wrong; please try again.');
                }
                return undefined;
            }
            if (!getCompletionsResponse.completionItems) {
                // TODO(nick): Distinguish warning / error states here.
                const message = ' No completions were generated';
                this.setStatus(Status.SUCCESS);
                this.setMessage(message);
                return undefined;
            }
            const completionItems = getCompletionsResponse.completionItems;
            // Create inline completion items from completions.
            const inlineCompletionItems = completionItems
                .map((completionItem) => this.createInlineCompletionItem(completionItem, document))
                .filter((item) => !!item);
            this.setStatus(Status.SUCCESS);
            let message = `Generated ${inlineCompletionItems.length} completions`;
            if (inlineCompletionItems.length === 1) {
                message = `Generated 1 completion`;
            }
            this.setMessage(message);
            return {
                items: inlineCompletionItems,
            };
        });
    }
    /**
     * Record that the last completion shown was accepted by the user.
     * @param ctx - Codeium context
     * @param completionId - unique ID of the last completion.
     */
    acceptedLastCompletion(completionId) {
        new Promise((resolve, reject) => {
            this.client
                .acceptCompletion({
                metadata: this.getMetadata(),
                completionId: completionId,
            }, {
                headers: this.getAuthHeader(),
            })
                .then(resolve)
                .catch((err) => {
                console.log('Error: ', err);
            });
        });
    }
    /**
     * Gets document info object for the given document.
     *
     * @param document - The document to get info for.
     * @param position - Optional position used to get offset in document.
     * @returns The document info object and additional UTF-8 byte offset.
     */
    getDocumentInfo(document, position) {
        // The offset is measured in bytes.
        const text = document.getText();
        const numCodeUnits = document.offsetAt(position);
        const offset = numCodeUnitsToNumUtf8Bytes(text, numCodeUnits);
        const language = languageIdToEnum(document.languageId);
        if (language === Language.UNSPECIFIED) {
            console.warn(`Unknown language: ${document.languageId}`);
        }
        const documentInfo = new Document$1({
            text: text,
            editorLanguage: document.languageId,
            language,
            cursorOffset: BigInt(offset),
            lineEnding: '\n',
        });
        return documentInfo;
    }
    /**
     * Converts the completion and range to inline completion item.
     *
     * @param completionItem
     * @param document
     * @returns Inline completion item.
     */
    createInlineCompletionItem(completionItem, document) {
        if (!completionItem.completion || !completionItem.range) {
            return undefined;
        }
        // Create and return inlineCompletionItem.
        const text = document.getText();
        const startPosition = document.positionAt(numUtf8BytesToNumCodeUnits(text, Number(completionItem.range.startOffset)));
        const endPosition = document.positionAt(numUtf8BytesToNumCodeUnits(text, Number(completionItem.range.endOffset)));
        const range = new Range(startPosition, endPosition);
        const inlineCompletionItem = new MonacoInlineCompletion(completionItem.completion.text, range, completionItem.completion.completionId);
        return inlineCompletionItem;
    }
}

class InlineCompletionProvider {
    constructor(grpcClient, setCompletionCount, setCodeiumStatus, setCodeiumStatusMessage, apiKey, multilineModelThreshold) {
        this.setCompletionCount = setCompletionCount;
        this.numCompletionsProvided = 0;
        this.completionProvider = new MonacoCompletionProvider(grpcClient, setCodeiumStatus, setCodeiumStatusMessage, apiKey, multilineModelThreshold);
    }
    freeInlineCompletions() {
        // nothing
    }
    provideInlineCompletions(model, position, context, token) {
        return __awaiter(this, void 0, void 0, function* () {
            const completions = yield this.completionProvider.provideInlineCompletions(model, position, token);
            // Only count completions provided if non-empty (i.e. exclude cancelled
            // requests).
            // TODO(nick): don't count cached results either.
            // TODO(nick): better distinguish warning and error states.
            if (completions) {
                this.numCompletionsProvided += 1;
                this.setCompletionCount(this.numCompletionsProvided);
            }
            return completions;
        });
    }
    acceptedLastCompletion(completionId) {
        this.completionProvider.acceptedLastCompletion(completionId);
    }
    updateOtherDocuments(otherDocuments) {
        this.completionProvider.otherDocuments = otherDocuments;
    }
}

/**
 * Renders the Codeium logo as an SVG image.
 *
 * @param {Object} props - The component props.
 * @param {string} props.className - The class name to apply to the SVG element.
 * @param {boolean} props.loading - Whether the logo should represent a loading state.
 * @return {JSX.Element} - The JSX element representing the SVG image.
 */
const CodeiumLogo = (_a) => {
    var { className, loading = false } = _a, props = __rest(_a, ["className", "loading"]);
    return (React.createElement("svg", Object.assign({ viewBox: "0 0 124 124", "aria-label": "Codeium Logo", fill: "none", xmlns: "http://www.w3.org/2000/svg" }, props, { className: className }),
        React.createElement("mask", { id: "mask0_306_96", style: {
                maskType: 'alpha',
            }, maskUnits: "userSpaceOnUse", x: "0", y: "0", width: "124", height: "124" },
            React.createElement("path", { d: "M0 10C0 4.47715 4.47715 0 10 0H114C119.523 0 124 4.47715 124 10V114C124 119.523 119.523 124 114 124H10C4.47715 124 0 119.523 0 114V10Z", fill: "#D9D9D9" })),
        React.createElement("g", { mask: "url(#mask0_306_96)" },
            React.createElement("path", { d: "M62 62L0 124V0L62 62Z", fill: "#60D5C4" }),
            React.createElement("path", { d: "M62 62L124 124V0L62 62Z", fill: "#60D5C4" }),
            React.createElement("path", { d: "M62 62L124 124L0 124L62 62Z", fill: "#71E9D8" }),
            React.createElement("path", { d: "M62 62L124 0L0 0L62 62Z", fill: "#71E9D8" }),
            React.createElement("path", { d: "M107.387 16H16.6133C16.2746 16 16 16.2746 16 16.6133V107.387C16 107.725 16.2746 108 16.6133 108H107.387C107.725 108 108 107.725 108 107.387V16.6133C108 16.2746 107.725 16 107.387 16Z", fill: "#09B6A2" }),
            React.createElement("path", { d: "M75.196 77.1134C74.1902 77.1134 73.3102 76.7612 72.5559 76.0566C71.8375 75.3169 71.4783 74.4538 71.4783 73.4675C71.4783 72.4459 71.8375 71.5828 72.5559 70.8783C73.3102 70.1386 74.1902 69.7687 75.196 69.7687C76.2377 69.7687 77.1177 70.1386 77.8361 70.8783C78.5545 71.5828 78.9137 72.4459 78.9137 73.4675C78.9137 74.4538 78.5545 75.3169 77.8361 76.0566C77.1177 76.7612 76.2377 77.1134 75.196 77.1134Z", fill: "white", "aria-label": "right-dot", className: loading ? 'animate-blink duration-1000' : '', style: { animationDelay: '666ms' } }),
            React.createElement("path", { d: "M62.3573 77.1134C61.3516 77.1134 60.4715 76.7612 59.7172 76.0566C58.9988 75.3169 58.6396 74.4538 58.6396 73.4675C58.6396 72.4459 58.9988 71.5828 59.7172 70.8783C60.4715 70.1386 61.3516 69.7687 62.3573 69.7687C63.399 69.7687 64.2791 70.1386 64.9974 70.8783C65.7158 71.5828 66.075 72.4459 66.075 73.4675C66.075 74.4538 65.7158 75.3169 64.9974 76.0566C64.2791 76.7612 63.399 77.1134 62.3573 77.1134Z", fill: "white", "aria-label": "middle-dot", className: loading ? 'animate-blink duration-1000' : '', style: { animationDelay: '333ms' } }),
            React.createElement("path", { d: "M49.519 77.1134C48.5132 77.1134 47.6332 76.7612 46.8789 76.0566C46.1605 75.3169 45.8013 74.4538 45.8013 73.4675C45.8013 72.4459 46.1605 71.5828 46.8789 70.8783C47.6332 70.1386 48.5132 69.7687 49.519 69.7687C50.5607 69.7687 51.4407 70.1386 52.1591 70.8783C52.8775 71.5828 53.2367 72.4459 53.2367 73.4675C53.2367 74.4538 52.8775 75.3169 52.1591 76.0566C51.4407 76.7612 50.5607 77.1134 49.519 77.1134Z", fill: "white", "aria-label": "left-dot", className: loading ? 'animate-blink duration-1000' : '', style: { animationDelay: '0ms' } }),
            React.createElement("path", { d: "M85.9869 88.6325C85.1967 88.6325 84.5501 88.3683 84.0473 87.8399C83.5444 87.3468 83.2929 86.7127 83.2929 85.9377C83.2929 85.1275 83.5444 84.4758 84.0473 83.9826C84.5501 83.4894 85.1967 83.2429 85.9869 83.2429C88.178 83.2429 89.2736 82.1684 89.2736 80.0196V67.7079C89.2736 65.2421 89.8483 63.287 90.9977 61.8427C90.423 61.1029 89.992 60.2399 89.7046 59.2535C89.4173 58.2672 89.2736 57.1575 89.2736 55.9246V43.6129C89.2736 41.4641 88.178 40.3897 85.9869 40.3897C85.1967 40.3897 84.5501 40.1431 84.0473 39.6499C83.5444 39.1567 83.2929 38.5227 83.2929 37.7477C83.2929 36.9727 83.5444 36.321 84.0473 35.7926C84.5501 35.2642 85.1967 35 85.9869 35C91.8419 35 94.7693 37.871 94.7693 43.6129V55.9246C94.7693 58.0734 95.8469 59.1478 98.0021 59.1478C98.7924 59.1478 99.4389 59.3944 99.9418 59.8876C100.481 60.3808 100.75 61.0325 100.75 61.8427C100.75 62.6177 100.481 63.2517 99.9418 63.7449C99.4389 64.2381 98.7924 64.4847 98.0021 64.4847C95.8469 64.4847 94.7693 65.5591 94.7693 67.7079V80.0196C94.7693 85.7616 91.8419 88.6325 85.9869 88.6325Z", fill: "white", "aria-label": "open-bracket" }),
            React.createElement("path", { d: "M38.7631 88.6325C32.9081 88.6325 29.9807 85.7616 29.9807 80.0196V67.7079C29.9807 65.5591 28.9031 64.4847 26.7479 64.4847C25.9576 64.4847 25.2931 64.2381 24.7543 63.7449C24.2514 63.2517 24 62.6177 24 61.8427C24 61.0325 24.2514 60.3808 24.7543 59.8876C25.2931 59.3944 25.9576 59.1478 26.7479 59.1478C28.9031 59.1478 29.9807 58.0734 29.9807 55.9246V43.6129C29.9807 37.871 32.9081 35 38.7631 35C39.5533 35 40.1999 35.2642 40.7027 35.7926C41.2056 36.321 41.4571 36.9727 41.4571 37.7477C41.4571 38.5227 41.2056 39.1567 40.7027 39.6499C40.1999 40.1431 39.5533 40.3897 38.7631 40.3897C36.572 40.3897 35.4764 41.4641 35.4764 43.6129V55.9246C35.4764 57.1575 35.3327 58.2672 35.0454 59.2535C34.758 60.2399 34.327 61.1029 33.7522 61.8427C34.9017 63.287 35.4764 65.2421 35.4764 67.7079V80.0196C35.4764 82.1684 36.572 83.2429 38.7631 83.2429C39.5533 83.2429 40.1999 83.4894 40.7027 83.9826C41.2056 84.4758 41.4571 85.1275 41.4571 85.9377C41.4571 86.7127 41.2056 87.3468 40.7027 87.8399C40.1999 88.3683 39.5533 88.6325 38.7631 88.6325Z", fill: "white", "aria-label": "close-bracket" }))));
};

/**
 * Merges a partial object with a fallback object, deeply combining the two.
 *
 * @param {Partial<T>} partial - the partial object to merge (can be undefined)
 * @param {T} fallback - the fallback object to merge with
 * @return {T} the merged object
 */
function deepMerge(partial, fallback) {
    const merged = Object.assign({}, fallback);
    for (const key in partial) {
        if (typeof partial[key] === 'object' && !Array.isArray(partial[key])) {
            if (fallback[key] &&
                typeof fallback[key] === 'object' &&
                !Array.isArray(fallback[key])) {
                merged[key] = deepMerge(partial[key], fallback[key]);
            }
            else {
                merged[key] = Object.assign({}, partial[key]);
            }
        }
        else {
            merged[key] = partial[key];
        }
    }
    return merged;
}

/**
 * Code editor that enables Codeium AI suggestions in the editor.
 * The layout by default is width = 100% and height = 300px. These values can be overridden by passing in a string value to the width and/or height props.
 */
const CodeiumEditor = (_a) => {
    var { languageServerAddress = 'https://web-backend.codeium.com', otherDocuments = [], containerClassName = '', containerStyle = {} } = _a, props = __rest(_a, ["languageServerAddress", "otherDocuments", "containerClassName", "containerStyle"]);
    const editorRef = useRef(null);
    const monacoRef = useRef(null);
    const inlineCompletionsProviderRef = useRef(null);
    const [acceptedCompletionCount, setAcceptedCompletionCount] = useState(-1);
    const [completionCount, setCompletionCount] = useState(0);
    const [codeiumStatus, setCodeiumStatus] = useState(Status.INACTIVE);
    const [codeiumStatusMessage, setCodeiumStatusMessage] = useState('');
    const [mounted, setMounted] = useState(false);
    const transport = useMemo(() => {
        return createConnectTransport({
            baseUrl: languageServerAddress,
            useBinaryFormat: true,
        });
    }, [languageServerAddress]);
    const grpcClient = useMemo(() => {
        return createPromiseClient(LanguageServerService, transport);
    }, [transport]);
    inlineCompletionsProviderRef.current = useMemo(() => {
        return new InlineCompletionProvider(grpcClient, setCompletionCount, setCodeiumStatus, setCodeiumStatusMessage, props.apiKey, props.multilineModelThreshold);
    }, []);
    useEffect(() => {
        if (!(editorRef === null || editorRef === void 0 ? void 0 : editorRef.current) ||
            !monacoRef.current ||
            !inlineCompletionsProviderRef.current) {
            return;
        }
        const monaco = monacoRef.current;
        const providerDisposable = monaco.languages.registerInlineCompletionsProvider({ pattern: '**' }, inlineCompletionsProviderRef.current);
        const completionDisposable = monaco.editor.registerCommand('codeium.acceptCompletion', (_, completionId, insertText) => {
            var _a;
            try {
                if (props.onAutocomplete) {
                    props.onAutocomplete(insertText);
                }
                setAcceptedCompletionCount(acceptedCompletionCount + 1);
                (_a = inlineCompletionsProviderRef.current) === null || _a === void 0 ? void 0 : _a.acceptedLastCompletion(completionId);
            }
            catch (err) {
                console.log('Err');
            }
        });
        return () => {
            providerDisposable.dispose();
            completionDisposable.dispose();
        };
    }, [
        editorRef === null || editorRef === void 0 ? void 0 : editorRef.current,
        monacoRef === null || monacoRef === void 0 ? void 0 : monacoRef.current,
        inlineCompletionsProviderRef === null || inlineCompletionsProviderRef === void 0 ? void 0 : inlineCompletionsProviderRef.current,
        acceptedCompletionCount,
        mounted,
    ]);
    const handleEditorDidMount = (editor, monaco) => __awaiter(void 0, void 0, void 0, function* () {
        editorRef.current = editor;
        monacoRef.current = monaco;
        setMounted(true);
        // CORS pre-flight cache optimization.
        try {
            yield grpcClient.getCompletions({});
        }
        catch (e) {
            // This is expected.
        }
        // Pass the editor instance to the user defined onMount prop.
        if (props.onMount) {
            props.onMount(editor, monaco);
        }
    });
    // Keep other documents up to date.
    useEffect(() => {
        var _a;
        (_a = inlineCompletionsProviderRef.current) === null || _a === void 0 ? void 0 : _a.updateOtherDocuments(otherDocuments);
    }, [otherDocuments]);
    let defaultLanguageProps = {
        defaultLanguage: props.language,
        defaultValue: getDefaultValue(props.language),
    };
    const layout = {
        width: props.width || '100%',
        // The height is set to 300px by default. Otherwise, the editor when
        // rendered with the default value will not be visible.
        // The monaco editor's default height is 100% but it requires the user to
        // define a container with an explicit height.
        height: props.height || '300px',
    };
    return (React.createElement("div", { style: Object.assign(Object.assign(Object.assign({}, layout), { position: 'relative' }), containerStyle), className: containerClassName },
        React.createElement("a", { href: 'https://codeium.com?referrer=codeium-editor', target: "_blank", rel: "noreferrer noopener" },
            React.createElement(CodeiumLogo, { width: 30, height: 30, style: { position: 'absolute', top: 12, right: 12, zIndex: 1 } })),
        React.createElement(Ft, Object.assign({}, defaultLanguageProps, props, { width: layout.width, height: layout.height, onMount: handleEditorDidMount, options: deepMerge(props.options, {
                scrollBeyondLastColumn: 0,
                scrollbar: {
                    alwaysConsumeMouseWheel: false,
                },
                codeLens: false,
                // for resizing, but apparently might have "severe performance impact"
                // automaticLayout: true,
                minimap: {
                    enabled: false,
                },
                quickSuggestions: false,
                folding: false,
                foldingHighlight: false,
                foldingImportsByDefault: false,
                links: false,
                fontSize: 14,
                wordWrap: 'on',
            }) }))));
};

export { CodeiumEditor, Document$1 as Document, Language };
//# sourceMappingURL=index.js.map
