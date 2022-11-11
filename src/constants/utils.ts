import {
  Platform,
  Linking,
  Dimensions,
  PixelRatio,
  StatusBar,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
const window = Dimensions.get('window');
const {width: windowWidth, height: windowHeight} = window;

const getFileName = (fileName, uri) => {
  let imgName = fileName;
  if (typeof fileName === 'undefined' || fileName === null) {
    const getFilename = uri.split('/');
    imgName = getFilename[getFilename.length - 1];
  }
  return imgName;
};

export function safeRun(fn) {
  if (typeof fn === 'function') {
    fn();
  }
}

export function openMap(lat, lng) {
  const scheme = Platform.select({ios: 'maps:0,0?q=', android: 'geo:0,0?q='});

  const latLng = `${lat},${lng}`;
  const url = `${scheme}${latLng}`;

  Linking.openURL(url);
}

export function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

export function arraysIdentical(a, b) {
  var i = a.length;
  while (i--) {
    if (a[i] !== b[i]) {
      return false;
    }
  }
  return true;
}

export const sleep = time =>
  new Promise(resolve => setTimeout(() => resolve(), time));

export const deviceSize = getDeviceSize(windowWidth, windowHeight, Platform.OS);

export function getDeviceSize(width: number, height: number, platform: string) {
  if (platform === 'ios') {
    if ((width <= 320 && height <= 480) || (width <= 480 && height <= 320)) {
      // iphone 4 spec
      return 'xsmall';
    } else if (
      (width <= 320 && height <= 568) ||
      (width <= 568 && height <= 320)
    ) {
      // iphone 5 spec
      return 'small';
    } else if (
      (width <= 375 && height <= 667) ||
      (width <= 667 && height <= 375)
    ) {
      // iphone 6 spec
      return 'normal';
    } else if (
      (width <= 414 && height <= 736) ||
      (width <= 736 && height <= 414)
    ) {
      // iphone 6 plus spec
      return 'large';
    }

    // greater then inphone 6 plus, such as tablets
    return 'xlarge';
  } else if (platform === 'android') {
    if ((width >= 960 && height >= 720) || (width >= 720 && width >= 960)) {
      return 'xlarge';
    } else if (
      (width >= 640 && height >= 480) ||
      (width >= 480 && height >= 640)
    ) {
      return 'large';
    } else if (
      (width >= 470 && height >= 320) ||
      (width >= 320 && height >= 470)
    ) {
      return 'normal';
    } else if (
      (width >= 426 && height >= 320) ||
      (width >= 320 && height >= 426)
    ) {
      return 'small';
    }

    return 'xsmall';
  }
}

export const formatPrice = price =>
  price?.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');

export const formatString = (string, slice = 100) => {
  if (string?.length > slice) {
    return string.slice(0, slice) + ' ...';
  }
  return string;
};

export const formatDuration = seconds => {
  var h = Math.floor(seconds / 3600);
  var m = Math.floor((seconds % 3600) / 60);
  var s = Math.floor((seconds % 3600) % 60);

  var hDisplay = h > 0 ? h + ':' : '';
  var mDisplay = m >= 10 ? m + ':' : m > 0 ? '0' + m + ':' : s > 0 ? '00:' : '';
  var sDisplay = s >= 10 ? s : s > 0 ? '0' + s : m > 0 ? '00' : '';
  return hDisplay + mDisplay + sDisplay;
};

export const openUrl = async url => {
  const supported = await Linking.canOpenURL(url);

  if (supported) {
    await Linking.openURL(url);
  }
};

export const isAndroid = Platform.OS === 'android';
export const isIOS = Platform.OS === 'ios';

export function convertTZ(dateString) {
  const str = isAndroid ? dateString : dateString?.replace(/-/g, '/') + ' GMT';
  const dateTime = new Date(str);

  return [
    dateTime.getUTCFullYear(),
    dateTime.getUTCMonth(),
    dateTime.getUTCDate(),
    dateTime.getUTCHours(),
    dateTime.getUTCMinutes(),
    dateTime.getUTCSeconds(),
  ];
}

export function parsedDate(strDate) {
  var date = new Date(strDate);
  var d = date.getDate();
  var m = date.getMonth() + 1;
  var y = date.getFullYear();
  date = y + '/' + (m <= 9 ? '0' + m : m) + '/' + (d <= 9 ? '0' + d : d);
  return date.toString();
}

//----------------------------scale utils-----------------------------------------------------
export function isIphoneX() {
  return (
    Platform.OS === 'ios' &&
    !Platform.isPad &&
    !Platform.isTVOS &&
    (windowHeight === 780 ||
      windowWidth === 780 ||
      windowHeight === 812 ||
      windowWidth === 812 ||
      windowHeight === 844 ||
      windowWidth === 844 ||
      windowHeight === 896 ||
      windowWidth === 896 ||
      windowHeight === 926 ||
      windowWidth === 926)
  );
}

export function ifIphoneX(iphoneXStyle, regularStyle) {
  if (isIphoneX()) {
    return iphoneXStyle;
  }
  return regularStyle;
}

export function getStatusBarHeight(safe) {
  return Platform.select({
    ios: ifIphoneX(safe ? 44 : 30, 20),
    android: StatusBar.currentHeight,
    default: 0,
  });
}

export function scaleFontSize(fontSize, standardScreenHeight = 812) {
  const standardLength =
    windowWidth > windowHeight ? windowWidth : windowHeight;
  const offset =
    windowWidth > windowHeight
      ? 0
      : Platform.OS === 'ios'
      ? 78
      : StatusBar.currentHeight; // iPhone X style SafeAreaView size in portrait
  const deviceHeight =
    isIphoneX() || isAndroid ? standardLength - offset : standardLength;
  const heightPercent = (fontSize * deviceHeight) / standardScreenHeight;
  return PixelRatio.roundToNearestPixel(heightPercent);
}

export function scale(size, standardScreenWidth = 375) {
  return PixelRatio.roundToNearestPixel(
    (size * windowWidth) / standardScreenWidth,
  );
}

export const moderateScale = (size, factor = 0.5) =>
  size + (scale(size) - size) * factor;

export const widthPercentageToDP = widthPercent => {
  // Convert string input to decimal number
  const elemWidth = parseFloat(widthPercent);
  return PixelRatio.roundToNearestPixel((windowWidth * elemWidth) / 100);
};

export const heightPercentageToDP = heightPercent => {
  // Convert string input to decimal number
  const elemHeight = parseFloat(heightPercent);
  return PixelRatio.roundToNearestPixel((windowHeight * elemHeight) / 100);
};

//--------------------------------------------------------------------------------------------------------------
export function formatPhoneNumber(phoneNumber) {
  return '0' + phoneNumber.slice(3);
}

export const openInBrowser = url => {
  Linking.openURL(url).catch(err => console.error("Couldn't load page", err));
};

export function sortByKey(array, key) {
  return array.sort(function (a, b) {
    var x = a?.[key] ? a[key] : 0;
    var y = b?.[key] ? b[key] : 0;
    return x > y ? 1 : x < y ? -1 : 0;
  });
}
export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

export function showFullNumber(number, digits) {
  return Number(number).toLocaleString('fullwide', {
    useGrouping: false,
    maximumFractionDigits: digits,
  });
}

export function wait(ms) {
  return new Promise((_, reject) => {
    setTimeout(() => reject('Time out'), ms);
  });
}

export function formatNumberDigits(number) {
  let formatNumber = '';
  if (number.toString().includes('.')) {
    const splitNumber = number.toString().split('.');

    if (splitNumber[1].length >= 5 && splitNumber[1].startsWith('99999')) {
      formatNumber = (Math.floor(number * 1e6) / 1e6)
        .toFixed(5)
        .replace(/\.?0+$/, '');
    } else {
      formatNumber = Math.floor(number * 1e5) / 1e5;
    }
  } else {
    formatNumber = number;
  }

  return formatNumber;
}

export function stringToASCII(str) {
  try {
    return str
      .replace(/[àáảãạâầấẩẫậăằắẳẵặ]/g, 'a')
      .replace(/[èéẻẽẹêềếểễệ]/g, 'e')
      .replace(/[đ]/g, 'd')
      .replace(/[ìíỉĩị]/g, 'i')
      .replace(/[òóỏõọôồốổỗộơờớởỡợ]/g, 'o')
      .replace(/[ùúủũụưừứửữự]/g, 'u')
      .replace(/[ỳýỷỹỵ]/g, 'y');
  } catch {
    return '';
  }
}

export function numberFormat(value) {
  const formatted = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(value);
  return formatted;
}

export const emailRegex =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const mediaFromLib = options => {
  return new Promise((resolve, reject) => {
    const defaultOptions = {
      mediaType: 'photo',
      multiple: true,
      // cropping: true,
      compressImageMaxWidth: 800,
      compressImageQuality: 0.8,
    };

    if (Platform.OS === 'ios') {
      defaultOptions.maxFiles = 15;
    }

    ImagePicker.openPicker(Object.assign(defaultOptions, options))
      .then(images => {
        if (Array.isArray(images)) {
          let imageFiles = [];
          images.forEach(img => {
            let imageFile = {
              uri: img.path,
              type: img.mime,
              name: getFileName(img.filename, img.path),
              width: img.width,
              height: img.height,
              size: img.size,
              // base64: img.base64,
            };
            if (options?.includeBase64) {
              imageFile.base64 = `data:${img.mime};base64,${img.data}`;
            }

            imageFiles.push(imageFile);
          });
          resolve(imageFiles);
        } else {
          resolve({
            uri: images.path,
            type: images.mime,
            name: getFileName(images.filename, images.path),
            width: images.width,
            height: images.height,
            size: images.size,
          });
        }
      })
      .catch(error => {
        reject(error);
      });
  });
};
