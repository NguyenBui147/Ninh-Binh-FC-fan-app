import CryptoJS from 'crypto-js';

const VNP_TMN_CODE = '5T7Y2G1W'; // Replace with your TmnCode (this is a test code)
const VNP_HASH_SECRET = 'YOUR_HASH_SECRET'; // Replace with your HashSecret
const VNP_URL = 'https://sandbox.vnpayment.vn/paymentv2/vpcpay.html';
const VNP_RETURN_URL = 'https://yourwebsite.com/vnpay_return'; // Replace with your return URL or deep link

function formatVNPayDate(date: Date): string {
    const pad = (n: number) => (n < 10 ? `0${n}` : n);
    const year = date.getFullYear();
    const month = pad(date.getMonth() + 1);
    const day = pad(date.getDate());
    const hour = pad(date.getHours());
    const minute = pad(date.getMinutes());
    const second = pad(date.getSeconds());
    return `${year}${month}${day}${hour}${minute}${second}`;
}

export function generateVNPayUrl(amountStr: number, orderInfo: string, ipAddr: string = '127.0.0.1'): string {
    const date = new Date();
    const createDate = formatVNPayDate(date);
    const orderId = formatVNPayDate(date) + Math.floor(Math.random() * 10000); // Simple unique order ID

    const vnp_Params: Record<string, string> = {
        vnp_Version: '2.1.0',
        vnp_Command: 'pay',
        vnp_TmnCode: VNP_TMN_CODE,
        vnp_Locale: 'vn',
        vnp_CurrCode: 'VND',
        vnp_TxnRef: orderId,
        vnp_OrderInfo: orderInfo,
        vnp_OrderType: 'other',
        vnp_Amount: (amountStr * 100).toString(),
        vnp_ReturnUrl: VNP_RETURN_URL,
        vnp_IpAddr: ipAddr,
        vnp_CreateDate: createDate,
    };
    const sortedKeys = Object.keys(vnp_Params).sort();
    const sortedParams: Record<string, string> = {};

    for (const key of sortedKeys) {
        sortedParams[key] = vnp_Params[key];
    }
    const signData = Object.entries(sortedParams)
        .map(([key, value]) => `${key}=${encodeURIComponent(value.toString()).replace(/%20/g, '+')}`)
        .join('&');
    const hmac = CryptoJS.HmacSHA512(signData, VNP_HASH_SECRET);
    const signed = CryptoJS.enc.Hex.stringify(hmac);
    vnp_Params['vnp_SecureHash'] = signed;
    const searchParams = Object.entries(vnp_Params)
        .map(([key, value]) => `${key}=${encodeURIComponent(value.toString()).replace(/%20/g, '+')}`)
        .join('&');

    return `${VNP_URL}?${searchParams}`;
}
