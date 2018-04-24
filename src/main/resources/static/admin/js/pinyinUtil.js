
/**
 * 汉字与拼音互转工具，根据导入的字典文件的不同支持不同
 * 对于多音字目前只是将所有可能的组合输出，准确识别多音字需要完善的词库，而词库文件往往比字库还要大，所以不太适合web环境。
 * @start 2016-09-26
 * @last 2016-09-29
 */
;(function(global, factory) {
	if (typeof module === "object" && typeof module.exports === "object") {
		module.exports = factory(global);
	} else {
		factory(global);
	}
})(typeof window !== "undefined" ? window : this, function(window) {


	let dict = {}; // 存储所有字典数据
	let pinyinUtil =
	{
		/**
		 * 解析各种字典文件，所需的字典文件必须在本JS之前导入
		 */
		parseDict: function()
		{
			// 如果导入了 pinyin_dict_firstletter.js
			if(window.pinyin_dict_firstletter)
			{
				dict.firstletter = pinyin_dict_firstletter;
			}
			// 如果导入了 pinyin_dict_notone.js
			if(window.pinyin_dict_notone)
			{
				dict.notone = {};
				dict.py2hz = pinyin_dict_notone; // 拼音转汉字
				for(let i in pinyin_dict_notone)
				{
					let temp = pinyin_dict_notone[i];
					for(let j=0, len=temp.length; j<len; j++)
					{
						dict.notone[temp[j]] = i; // 不考虑多音字
					}
				}
			}
		},
		/**
		 * 根据汉字获取拼音，如果不是汉字直接返回原字符
		 * @param chinese 要转换的汉字
		 * @param splitter 分隔字符，默认用空格分隔
		 * @param withtone 返回结果是否包含声调，默认是
		 * @param polyphone 是否支持多音字，默认否
		 */
		getPinyin: function(chinese, splitter, withtone, polyphone)
		{
			if(!chinese || /^ +$/g.test(chinese)) return '';
			splitter = splitter == undefined ? ' ' : splitter;
			withtone = withtone == undefined ? true : withtone;
			polyphone = polyphone == undefined ? false : polyphone;
			let result = [];
			if(dict.withtone) // 优先使用带声调的字典文件
			{
				for (let i=0, len = chinese.length; i < len; i++)
				{
					let pinyin = dict.withtone[chinese[i]];
					if(pinyin)
					{
						if(!polyphone) pinyin = pinyin.replace(/ .*$/g, ''); // 如果不需要多音字
						if(!withtone) pinyin = this.removeTone(pinyin); // 如果不需要声调
					}
					result.push(pinyin || chinese[i]); 
				}
			}
			else if(dict.notone) // 使用没有声调的字典文件
			{
				if(withtone) console.warn('pinyin_dict_notone 字典文件不支持声调！');
				if(polyphone) console.warn('pinyin_dict_notone 字典文件不支持多音字！');
				for (let i=0, len = chinese.length; i < len; i++)
				{
					let temp = chinese.charAt(i);
					result.push(dict.notone[temp] || temp); 
				}
			}
			else
			{
				throw '抱歉，未找到合适的拼音字典文件！';
			}
			if(!polyphone) return result.join(splitter);
			else
			{
				if(window.pinyin_dict_polyphone) return parsePolyphone(chinese, result, splitter, withtone);
				else return handlePolyphone(result, ' ', splitter);
			}
		},
		/**
		 * 获取汉字的拼音首字母
		 * @param str 汉字字符串，如果遇到非汉字则原样返回
		 * @param polyphone 是否支持多音字，默认false，如果为true，会返回所有可能的组合数组
		 */
		getFirstLetter: function(str, polyphone)
		{
			polyphone = polyphone == undefined ? false : polyphone;
			if(!str || /^ +$/g.test(str)) return '';
			if(dict.firstletter) // 使用首字母字典文件
			{
				let result = [];
				for(let i=0; i<str.length; i++)
				{
					let unicode = str.charCodeAt(i);
					let ch = str.charAt(i);
					if(unicode >= 19968 && unicode <= 40869)
					{
						ch = dict.firstletter.all.charAt(unicode-19968);
						if(polyphone) ch = dict.firstletter.polyphone[unicode] || ch;
					}
					result.push(ch);
				}
				if(!polyphone) return result.join(''); // 如果不用管多音字，直接将数组拼接成字符串
				else return handlePolyphone(result, '', ''); // 处理多音字，此时的result类似于：['D', 'ZC', 'F']
			}
			else
			{
				let py = this.getPinyin(str, ' ', false, polyphone);
				py = py instanceof Array ? py : [py];
				let result = [];
				for(let i=0; i<py.length; i++)
				{
					result.push(py[i].replace(/(^| )(\w)\w*/g, function(m,$1,$2){return $2.toUpperCase();}));
				}
				if(!polyphone) return result[0];
				else return simpleUnique(result);
			}
		},
		/**
		 * 拼音转汉字，只支持单个汉字，返回所有匹配的汉字组合
		 * @param pinyin 单个汉字的拼音，可以包含声调
		 */
		getHanzi: function(pinyin)
		{
			if(!dict.py2hz)
			{
				throw '抱歉，未找到合适的拼音字典文件！';
			}
			return dict.py2hz[this.removeTone(pinyin)] || '';
		},
		/**
		 * 获取某个汉字的同音字，本方法暂时有问题，待完善
		 * @param hz 单个汉字
		 * @param sameTone 是否获取同音同声调的汉字，必须传进来的拼音带声调才支持，默认false
		 */
		getSameVoiceWord: function(hz, sameTone)
		{
			sameTone = sameTone || false
			return this.getHanzi(this.getPinyin(hz, ' ', false))
		},

	};


	/**
	 * 处理多音字，将类似['D', 'ZC', 'F']转换成['DZF', 'DCF']
	 * 或者将 ['chang zhang', 'cheng'] 转换成 ['chang cheng', 'zhang cheng']
	 */
	function handlePolyphone(array, splitter, joinChar)
	{
		splitter = splitter || '';
		let result = [''], temp = [];
		for(let i=0; i<array.length; i++)
		{
			temp = [];
			let t = array[i].split(splitter);
			for(let j=0; j<t.length; j++)
			{
				for(let k=0; k<result.length; k++)
					temp.push(result[k] + (result[k]?joinChar:'') + t[j]);
			}
			result = temp;
		}
		return simpleUnique(result);
	}

	/**
	 * 根据词库找出多音字正确的读音
	 * 这里只是非常简单的实现，效率和效果都有一些问题
	 * 推荐使用第三方分词工具先对句子进行分词，然后再匹配多音字
	 * @param chinese 需要转换的汉字
	 * @param result 初步匹配出来的包含多个发音的拼音结果
	 * @param splitter 返回结果拼接字符
	 */
	function parsePolyphone(chinese, result, splitter, withtone)
	{
		let poly = window.pinyin_dict_polyphone;
		let max = 7; // 最多只考虑7个汉字的多音字词，虽然词库里面有10个字的，但是数量非常少，为了整体效率暂时忽略之
		let temp = poly[chinese];
		if(temp) // 如果直接找到了结果
		{
			temp = temp.split(' ');
			for(let i=0; i<temp.length; i++)
			{
				result[i] = temp[i] || result[i];
				if(!withtone) result[i] = pinyinUtil.removeTone(result[i]);
			}
			return result.join(splitter);
		}
		for(let i=0; i<chinese.length; i++)
		{
			temp = '';
			for(let j=0; j<max && (i+j)<chinese.length; j++)
			{
				if(!/^[\u2E80-\u9FFF]+$/.test(chinese[i+j])) break; // 如果碰到非汉字直接停止本次查找
				temp += chinese[i+j];
				let res = poly[temp];
				if(res) // 如果找到了多音字词语
				{
					res = res.split(' ');
					for(let k=0; k<=j; k++)
					{
						if(res[k]) result[i+k] = withtone ? res[k] : pinyinUtil.removeTone(res[k]);
					}
					break;
				}
			}
		}
		// 最后这一步是为了防止出现词库里面也没有包含的多音字词语
		for(let i=0; i<result.length; i++)
		{
			result[i] = result[i].replace(/ .*$/g, '');
		}
		return result.join(splitter);
	}

	// 简单数组去重
	function simpleUnique(array)
	{
		let result = [];
		let hash = {};
		for(let i=0; i<array.length; i++)
		{
			let key = (typeof array[i]) + array[i];
			if(!hash[key])
			{
				result.push(array[i]);
				hash[key] = true;
			}
		}
		return result;
	}

	pinyinUtil.parseDict();
	pinyinUtil.dict = dict;
	window.pinyinUtil = pinyinUtil;

});