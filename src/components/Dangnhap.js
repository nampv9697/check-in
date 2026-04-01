import '../css/dangnhap.css'
import { useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios'
function Dangnhap(props) {
    const login = () => {
        if (!user || !pass) {
            toast.warning("Bạn chưa nhập username hoặc password")
        }
        else {
            generateRandomNumber()
            infoAcc()
        }
    }
    const infoAcc = async () => {
        const res = await axios.post("https://ddc.fis.vn/fis0/api/login", acc)
        if (res.data.message === 'Sai username hay password') {
            toast.error('Sai username hoặc password')
        }
        else {
            toast.success('Đăng nhập thành công')
            localStorage.setItem('token', res.data.data.token)
            console.log(res.data)
        }
    }
    const [randomNumber, setRandomNumber] = useState(null);

    const generateRandomNumber = () => {
        const min = 1;
        const max = 250;
        const newRandomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
        setRandomNumber(newRandomNumber);
    }

    const [username, setUsername] = useState('')
    const [pass, setPass] = useState('')

    const acc = {
        username: username,
        password: pass,
        loginDevice: "3356e246-5cb4-4585-a575-b17593858e2a",
        buildNumber: "15",
        version: "1.69.10885",
        deviceIP: "10.15.188." + randomNumber,
        deviceModel: "iPhone",
        osVersion: "18"
    }

    const [isShowPassword, setIsShowPassword] = useState(false)


    const user = {
        "deviceId": "42940546-D218-4ABF-958B-FB87AE0FC10A",
        "reason": "",
        "ssid": "FIS",
        "ipGateway": "10.15.188.1",
        "type": 0
    }
    //checkin
    const check_in = async () => {
        var getToken = localStorage.getItem("token")
        const res = await axios.post('https://ddc.fis.vn/fis0/api/checkin_all', user, { headers: { "Authorization": `Bearer ${getToken}` } })
        console.log(res.data);
        if (res.data.message === 'Bạn đã checkin tại công ty hôm nay') {
            toast.warning(res.data.message)
            setTimeout(() => {
                window.location.reload()
            }, 1000)
        }
        else if (res.data.message === '-1') {
            toast.warning(res.data.message)
        }
        else {
            toast.success(res.data.message)
            setTimeout(() => {
                window.location.reload()
            }, 1000)
        }

        const timeCheckin = res.data.data.checkinTime
        const dataTime = timeCheckin.substring(11, 19)
        localStorage.setItem("timeCheckIn", dataTime)
    }
    const time_checkin = localStorage.getItem('timeCheckIn')

    //check_out
    const check_out = async () => {
        var getToken = localStorage.getItem("token")
        const res = await axios.post('https://ddc.fis.vn/fis0/api/checkout_all', user, { headers: { "Authorization": `Bearer ${getToken}` } })
        if (res.data.resultCode === -1) {
            toast.warning(res.data.message)
            setTimeout(() => {
                window.location.reload()
            }, 1000)
        }
        else {
            const timeCheckout = res.data.data.checkinTime
            const dataTime = timeCheckout.substring(11, 19)
            localStorage.setItem("timeCheckout", dataTime)
            toast.success(res.data.message)
            setTimeout(() => {
                window.location.reload()
            }, 1000)
        }
    }
    const time_checkout = localStorage.getItem('timeCheckout')
    return (
        <div class="wrapper">
                <div>
                    <div class="text-center mt-4 name">
                        <h4><b>ĐỪNG ĐỂ TIỀN RƠI</b></h4>
                        <h6>Đăng nhập với tài khoản FPT</h6>
                    </div>
                    <form class="p-3 mt-3" >
                        <div class="form-field d-flex align-items-center">
                            <span class="far fa-user">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-circle" viewBox="0 0 16 16">
                                    <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                                    <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1" />
                                </svg>
                            </span>
                            <input type="text" name="userName" id="userName" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
                        </div>
                        <div class="form-field d-flex align-items-center">
                            <span class="fas fa-key">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-key" viewBox="0 0 16 16">
                                    <path d="M0 8a4 4 0 0 1 7.465-2H14a.5.5 0 0 1 .354.146l1.5 1.5a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0L13 9.207l-.646.647a.5.5 0 0 1-.708 0L11 9.207l-.646.647a.5.5 0 0 1-.708 0L9 9.207l-.646.647A.5.5 0 0 1 8 10h-.535A4 4 0 0 1 0 8m4-3a3 3 0 1 0 2.712 4.285A.5.5 0 0 1 7.163 9h.63l.853-.854a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .708 0l.646.647.793-.793-1-1h-6.63a.5.5 0 0 1-.451-.285A3 3 0 0 0 4 5" />
                                    <path d="M4 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0" />
                                </svg>
                            </span>
                            <input type={isShowPassword === true ? "text" : "password"} name="password" id="pwd" placeholder="Password" onChange={(e) => setPass(e.target.value)} />
                            <div onClick={() => setIsShowPassword(!isShowPassword)}>
                                {
                                    isShowPassword === false ? <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-slash-fill" viewBox="0 0 16 16">
                                        <path d="m10.79 12.912-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7 7 0 0 0 2.79-.588M5.21 3.088A7 7 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474z" />
                                        <path d="M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829zm4.95.708-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829zm3.171 6-12-12 .708-.708 12 12z" />
                                    </svg>
                                        : <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-fill" viewBox="0 0 16 16">
                                            <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0" />
                                            <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8m8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7" />
                                        </svg>

                                }

                            </div>

                        </div>
                    </form>
                    <button class="btn login" onClick={() => login()}>Login</button>
                </div>
            <div>
                <div className='time'>
                    <p>Time Check in thành công: {time_checkin} </p>
                    <p>Time Check out thành công: {time_checkout} </p>
                </div>
                <div className='d-flex justify-content-between '>
                    <button type="button" class="btn btn-info text-white" onClick={() => check_in()}>Check in</button>
                    <button type="button" class="btn btn-danger text-white" onClick={() => check_out()}>Check out</button>
                </div>
            </div>
        </div>
    );
}

export default Dangnhap;