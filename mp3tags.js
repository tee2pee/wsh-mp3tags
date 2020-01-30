var mp3tags = (function(){

  // 参考: http://www.codeproject.com/Articles/17825/Reading-and-Writing-Binary-Files-Using-JScript
  
  /**
   * バイナリファイルストリーム用定数マップ
   */
  var bin2intMap = {
       0:    0,    1:    1,    2:    2,    3:    3,    4:    4,    5:    5,    6:    6,    7:    7,
       8:    8,    9:    9,   10:   10,   11:   11,   12:   12,   13:   13,   14:   14,   15:   15,
      16:   16,   17:   17,   18:   18,   19:   19,   20:   20,   21:   21,   22:   22,   23:   23,
      24:   24,   25:   25,   26:   26,   27:   27,   28:   28,   29:   29,   30:   30,   31:   31,
      32:   32,   33:   33,   34:   34,   35:   35,   36:   36,   37:   37,   38:   38,   39:   39,
      40:   40,   41:   41,   42:   42,   43:   43,   44:   44,   45:   45,   46:   46,   47:   47,
      48:   48,   49:   49,   50:   50,   51:   51,   52:   52,   53:   53,   54:   54,   55:   55,
      56:   56,   57:   57,   58:   58,   59:   59,   60:   60,   61:   61,   62:   62,   63:   63,
      64:   64,   65:   65,   66:   66,   67:   67,   68:   68,   69:   69,   70:   70,   71:   71,
      72:   72,   73:   73,   74:   74,   75:   75,   76:   76,   77:   77,   78:   78,   79:   79,
      80:   80,   81:   81,   82:   82,   83:   83,   84:   84,   85:   85,   86:   86,   87:   87,
      88:   88,   89:   89,   90:   90,   91:   91,   92:   92,   93:   93,   94:   94,   95:   95,
      96:   96,   97:   97,   98:   98,   99:   99,  100:  100,  101:  101,  102:  102,  103:  103,
     104:  104,  105:  105,  106:  106,  107:  107,  108:  108,  109:  109,  110:  110,  111:  111,
     112:  112,  113:  113,  114:  114,  115:  115,  116:  116,  117:  117,  118:  118,  119:  119,
     120:  120,  121:  121,  122:  122,  123:  123,  124:  124,  125:  125,  126:  126,  127:  127,
     199:  128,  252:  129,  233:  130,  226:  131,  228:  132,  224:  133,  229:  134,  231:  135,
     234:  136,  235:  137,  232:  138,  239:  139,  238:  140,  236:  141,  196:  142,  197:  143,
     201:  144,  230:  145,  198:  146,  244:  147,  246:  148,  242:  149,  251:  150,  249:  151,
     255:  152,  214:  153,  220:  154,  162:  155,  163:  156,  165:  157, 8359:  158,  402:  159,
     225:  160,  237:  161,  243:  162,  250:  163,  241:  164,  209:  165,  170:  166,  186:  167,
     191:  168, 8976:  169,  172:  170,  189:  171,  188:  172,  161:  173,  171:  174,  187:  175,
    9617:  176, 9618:  177, 9619:  178, 9474:  179, 9508:  180, 9569:  181, 9570:  182, 9558:  183,
    9557:  184, 9571:  185, 9553:  186, 9559:  187, 9565:  188, 9564:  189, 9563:  190, 9488:  191,
    9492:  192, 9524:  193, 9516:  194, 9500:  195, 9472:  196, 9532:  197, 9566:  198, 9567:  199,
    9562:  200, 9556:  201, 9577:  202, 9574:  203, 9568:  204, 9552:  205, 9580:  206, 9575:  207,
    9576:  208, 9572:  209, 9573:  210, 9561:  211, 9560:  212, 9554:  213, 9555:  214, 9579:  215,
    9578:  216, 9496:  217, 9484:  218, 9608:  219, 9604:  220, 9612:  221, 9616:  222, 9600:  223,
     945:  224,  223:  225,  915:  226,  960:  227,  931:  228,  963:  229,  181:  230,  964:  231,
     934:  232,  920:  233,  937:  234,  948:  235, 8734:  236,  966:  237,  949:  238, 8745:  239,
    8801:  240,  177:  241, 8805:  242, 8804:  243, 8992:  244, 8993:  245,  247:  246, 8776:  247,
     176:  248, 8729:  249,  183:  250, 8730:  251, 8319:  252,  178:  253, 9632:  254,  160:  255,
  };
  var int2binMap = {
      0:    0,   1:    1,   2:    2,   3:    3,   4:    4,   5:    5,   6:    6,   7:    7,
      8:    8,   9:    9,  10:   10,  11:   11,  12:   12,  13:   13,  14:   14,  15:   15,
     16:   16,  17:   17,  18:   18,  19:   19,  20:   20,  21:   21,  22:   22,  23:   23,
     24:   24,  25:   25,  26:   26,  27:   27,  28:   28,  29:   29,  30:   30,  31:   31,
     32:   32,  33:   33,  34:   34,  35:   35,  36:   36,  37:   37,  38:   38,  39:   39,
     40:   40,  41:   41,  42:   42,  43:   43,  44:   44,  45:   45,  46:   46,  47:   47,
     48:   48,  49:   49,  50:   50,  51:   51,  52:   52,  53:   53,  54:   54,  55:   55,
     56:   56,  57:   57,  58:   58,  59:   59,  60:   60,  61:   61,  62:   62,  63:   63,
     64:   64,  65:   65,  66:   66,  67:   67,  68:   68,  69:   69,  70:   70,  71:   71,
     72:   72,  73:   73,  74:   74,  75:   75,  76:   76,  77:   77,  78:   78,  79:   79,
     80:   80,  81:   81,  82:   82,  83:   83,  84:   84,  85:   85,  86:   86,  87:   87,
     88:   88,  89:   89,  90:   90,  91:   91,  92:   92,  93:   93,  94:   94,  95:   95,
     96:   96,  97:   97,  98:   98,  99:   99, 100:  100, 101:  101, 102:  102, 103:  103,
    104:  104, 105:  105, 106:  106, 107:  107, 108:  108, 109:  109, 110:  110, 111:  111,
    112:  112, 113:  113, 114:  114, 115:  115, 116:  116, 117:  117, 118:  118, 119:  119,
    120:  120, 121:  121, 122:  122, 123:  123, 124:  124, 125:  125, 126:  126, 127:  127,
    128:  199, 129:  252, 130:  233, 131:  226, 132:  228, 133:  224, 134:  229, 135:  231,
    136:  234, 137:  235, 138:  232, 139:  239, 140:  238, 141:  236, 142:  196, 143:  197,
    144:  201, 145:  230, 146:  198, 147:  244, 148:  246, 149:  242, 150:  251, 151:  249,
    152:  255, 153:  214, 154:  220, 155:  162, 156:  163, 157:  165, 158: 8359, 159:  402,
    160:  225, 161:  237, 162:  243, 163:  250, 164:  241, 165:  209, 166:  170, 167:  186,
    168:  191, 169: 8976, 170:  172, 171:  189, 172:  188, 173:  161, 174:  171, 175:  187,
    176: 9617, 177: 9618, 178: 9619, 179: 9474, 180: 9508, 181: 9569, 182: 9570, 183: 9558,
    184: 9557, 185: 9571, 186: 9553, 187: 9559, 188: 9565, 189: 9564, 190: 9563, 191: 9488,
    192: 9492, 193: 9524, 194: 9516, 195: 9500, 196: 9472, 197: 9532, 198: 9566, 199: 9567,
    200: 9562, 201: 9556, 202: 9577, 203: 9574, 204: 9568, 205: 9552, 206: 9580, 207: 9575,
    208: 9576, 209: 9572, 210: 9573, 211: 9561, 212: 9560, 213: 9554, 214: 9555, 215: 9579,
    216: 9578, 217: 9496, 218: 9484, 219: 9608, 220: 9604, 221: 9612, 222: 9616, 223: 9600,
    224:  945, 225:  223, 226:  915, 227:  960, 228:  931, 229:  963, 230:  181, 231:  964,
    232:  934, 233:  920, 234:  937, 235:  948, 236: 8734, 237:  966, 238:  949, 239: 8745,
    240: 8801, 241:  177, 242: 8805, 243: 8804, 244: 8992, 245: 8993, 246:  247, 247: 8776,
    248:  176, 249: 8729, 250:  183, 251: 8730, 252: 8319, 253:  178, 254: 9632, 255:  160
  };
  
  /**
   * バイナリファイルストリーム
   */
  var BinaryFileStream = function(filePath) {
    var stream = new ActiveXObject('ADODB.Stream');
    stream.Open();
    stream.Type = 2;
    stream.CharSet = '437';
    stream.LoadFromFile(filePath);
    
    var converter = new ActiveXObject('ADODB.Stream');
    converter.Open();
    
    this.close = function() {
      stream.Close();
      stream = null;
      converter.Close();
      converter = null;
    };
    
    this.getSize = function() {
      return stream.Size;
    };
    
    this.getPosition = function() {
      return stream.Position;
    };
    
    this.setPosition = function(position) {
      stream.Position = position;
    };
    
    this.skip = function(skipLength) {
      stream.Position = stream.Position + skipLength;
    }
    
    var readCore = function(readLength) {
      var result = [], len = 0;
      if (readLength < 0) {
        len = stream.Size - stream.Position;
      } else {
        len = readLength;
      }
      for (var i = 0; i < len; i++) {
        result.push(bin2intMap[stream.ReadText(1).charCodeAt(0)]);
      }
      return result;
    };
    
    this.read = function(readLength) {
      return readCore(readLength);
    };
    
    this.readString = function(readLength, charset) {
      var result = '', binaries = readCore(readLength);
      if (!charset) {
        for (var i = 0; i < binaries.length; i++) {
          result += String.fromCharCode(binaries[i]);
        }
      } else {
        converter.Position = 0;
        converter.setEOS();
        
        converter.Type = 2;
        converter.CharSet = '437';
        for (var i = 0; i < binaries.length; i++) {
          converter.WriteText(String.fromCharCode(int2binMap[binaries[i]]));
        }
        
        converter.Position = 0;
        converter.Type = 2;
        converter.Charset = charset;
        result = converter.ReadText();
      }
      return result;
    };
    
    var readNumberCore = function(readLength, isSigned, isLittleEndian) {
      var result = 0, binaries = readCore(readLength);
      var shiftNum = isSigned ? 7 : 8;
      if (isLittleEndian) {
        binaries.reverse();
      }
      for (var i = 0; i < binaries.length; i++) {
        result += binaries[i] << ((binaries.length - i - 1) * shiftNum);
      }
      return result;
    };
    
    this.readSignedNumberBE = function(readLength) {
      return readNumberCore(readLength, true, false);
    };
    
    this.readSignedNumberLE = function(readLength) {
      return readNumberCore(readLength, true, true);
    };
    
    this.readUnsignedNumberBE = function(readLength) {
      return readNumberCore(readLength, false, false);
    };
    
    this.readUnsignedNumberLE = function(readLength) {
      return readNumberCore(readLength, false, true);
    };
    
    this.readAll = function() {
      var position = stream.Position;
      stream.Position = 0;
      var result = readCore(-1);
      stream.Position = position;
      return result;
    };
  };
  
  var detectCharset = function(charsetType) {
    switch (charsetType) {
      case 1:
        return 'UTF-16';
      case 2:
        return 'UTF-16BE';
      case 3:
        return 'UTF-8';
      default:
        return 'ISO-8859-1';
    }
  };
  
  // http://akabeko.me/blog/memo/mp3/id3v2-frame-detail/
  return function(mp3Path) {
    var mp3 = new BinaryFileStream(mp3Path);
    
    var fileType = mp3.readString(3);
    if (fileType != 'ID3') {
      return null;
    }
    
    var ver = mp3.readUnsignedNumberBE(1);
    var rev = mp3.readUnsignedNumberBE(1);
    
    if (ver == 3) {
      var tags = {};
      
      mp3.skip(1); // ID3v2フラグ(1byte)
      
      var size = mp3.readSignedNumberBE(4);
      var endPosition = mp3.getPosition() + size;
      
      while (mp3.getPosition() < endPosition) {
        var frameId   = mp3.readString(4);
        var frameSize = mp3.readUnsignedNumberBE(4);
        
        if (frameSize <= 0) {
          break;
        }
        
        mp3.skip(2); // フレームフラグ(2byte)
        
        var frameDataStartPosition = mp3.getPosition();
        
        // 通常フレーム
        if (frameId.match(/^T/) && frameId != 'TXXX') {
          var charset = detectCharset(mp3.readUnsignedNumberBE(1));
          tags[frameId] = mp3.readString(frameSize - (mp3.getPosition() - frameDataStartPosition), charset);
        
        // サムネイルフレーム
        } else if (frameId == 'APIC') {
          var charset = detectCharset(mp3.readUnsignedNumberBE(1));
          
          var readData = function() {
            var readLength = frameSize - (mp3.getPosition() - frameDataStartPosition);
            var binaries = [];
            for (var i = 0; i < readLength; i++) {
              var binary = mp3.read(1);
              if (binary[0] != 0x00) {
                binaries.push(binary[0]);
              } else {
                break;
              }
            }
            return binaries;
          };
          var binaries2text = function(binaries) {
            var result = '';
            for (var i = 0; i < binaries.length; i++) {
              result += String.fromCharCode(binaries[i]);
            }
            return result;
          };
          
          var mimeType = binaries2text(readData());
          mp3.skip(1); // 画像タイプ(1byte)
          readData(); // Description(Nbyte)
          
          var readLength = frameSize - (mp3.getPosition() - frameDataStartPosition), buf = 0x00, toggle = 0;
          var base64 = '', base64Map = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
          for (var i = 0; i < (readLength + 1); i++) {
            var isLast = i >= readLength;
            var bin = isLast ? 0x00 : mp3.read(1);
            switch (toggle) {
              case 0:
                // AAAA AABB
                if (!isLast) base64 += base64Map.charAt((bin & 0xfc) >> 2); // 00AA AAAA
                buf = (bin & 0x03) << 4; // 00BB 0000
                break;
              case 1:
                // BBBB CCCC
                base64 += base64Map.charAt(buf + ((bin & 0xf0) >> 4)); // 00BB 0000 + 0000 BBBB
                buf = (bin & 0x0f) << 2; // 00CC CC00
                break;
              case 2:
                // CCDD DDDD
                base64 += base64Map.charAt(buf + ((bin & 0xc0) >> 6)); // 00CC CC00 + 0000 00CC
                if (!isLast) base64 += base64Map.charAt(bin & 0x3f); // 00DD DDDD
                buf = 0x00;
                break;
              default:
                break;
            }
            toggle = (toggle + 1) % 3
          }
          while (base64.length % 4 != 0) {
            base64 += '=';
          }
          tags[frameId] = 'data:' + mimeType + ';base64,' + base64;
        }
        
        mp3.setPosition(frameDataStartPosition + frameSize);
      }
      
      return tags;
    } else {
      return null;
    }
  };
})();