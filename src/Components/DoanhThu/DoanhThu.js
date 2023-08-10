import React, { useState } from 'react';
import Table from 'react-bootstrap/Table';
import axios from '../../services/Customize-axios'
import { useEffect } from 'react';

const ChonNam = () => {
    const [selectedYear, setSelectedYear] = useState('');

    const startYear = 2023;
    const endYear = 2040;
    const years = Array.from({ length: endYear - startYear + 1 }, (_, index) => startYear + index);
    const [listHistory, setListHistory] = useState([])
    const [listDoanhThu, setListDoanhThu] = useState([])
    const [listDoanhThuDien, setListDoanhThuDien] = useState([])

    const handleChangeYear = (event) => {
        setSelectedYear(event.target.value);

        const combinedArray = [];

        listHistory.forEach((itemA) => {
            const itemB = listDoanhThuDien.find((item) => item.thang == itemA.thang && item.nam == itemA.nam);
            if (itemB) {
                itemA.doanh_thu_thang = Number(itemA.doanh_thu_thang)
                itemB.doanh_thu_thang = Number(itemB.doanh_thu_thang)
                combinedArray.push({ nam: itemA.nam, thang: itemA.thang, doanh_thu_thang: itemA.doanh_thu_thang + itemB.doanh_thu_thang });
            } else {
                combinedArray.push(itemA);
            }
        });

        listDoanhThuDien.forEach((itemB) => {
            const itemA = listHistory.find((item) => item.thang == itemB.thang && item.nam == itemB.nam);
            if (!itemA) {
                combinedArray.push(itemB);
            }
        });

        let year = event.target.value
        console.log(listHistory);
        const result = combinedArray.filter((item) =>
            item.nam == year
        );
        console.log('Result: ', result);

        const doanhthu = months.map((item) => {
            const itemInArray2 = result.find((obj) => obj.thang === item.id);
            return { ...item, ...itemInArray2 };
        });
        // console.log(combinedArray);
        setListDoanhThu(doanhthu)
    };

    useEffect(() => {
        getAllHistory()
        getAllDoanhThuDien()
    }, [])
    useEffect(() => {
        if (listHistory && listDoanhThuDien) {
            console.log(listHistory);
            console.log(listDoanhThuDien);
            const combinedArray = [];

            listHistory.forEach((itemA) => {
                const itemB = listDoanhThuDien.find((item) => item.thang == itemA.thang && item.nam == itemA.nam);
                if (itemB) {
                    itemA.doanh_thu_thang = Number(itemA.doanh_thu_thang)
                    itemB.doanh_thu_thang = Number(itemB.doanh_thu_thang)
                    combinedArray.push({ nam: itemA.nam, thang: itemA.thang, doanh_thu_thang: itemA.doanh_thu_thang + itemB.doanh_thu_thang });
                } else {
                    combinedArray.push(itemA);
                }
            });

            listDoanhThuDien.forEach((itemB) => {
                const itemA = listHistory.find((item) => item.thang == itemB.thang && item.nam == itemB.nam);
                if (!itemA) {
                    combinedArray.push(itemB);
                }
            });

            console.log(combinedArray);
        }

    }, [listHistory, listDoanhThuDien])
    const getAllHistory = async () => {
        // console.log(user);
        let res = await axios.get(`/admin/doanh-thu`)
        setListHistory(res.doanh_thu)
        console.log('>>> Check api: ', res);

    }

    const getAllDoanhThuDien = async () => {
        // console.log(user);
        let res = await axios.get(`/admin/doanh-thu-dien`)
        setListDoanhThuDien(res.doanh_thu_dien)
        console.log('>>> Check api: ', res);

    }
    const months = [
        { id: 1, name: 'Tháng 1' },
        { id: 2, name: 'Tháng 2' },
        { id: 3, name: 'Tháng 3' },
        { id: 4, name: 'Tháng 4' },
        { id: 5, name: 'Tháng 5' },
        { id: 6, name: 'Tháng 6' },
        { id: 7, name: 'Tháng 7' },
        { id: 8, name: 'Tháng 8' },
        { id: 9, name: 'Tháng 9' },
        { id: 10, name: 'Tháng 10' },
        { id: 11, name: 'Tháng 11' },
        { id: 12, name: 'Tháng 12' },
    ];
    let total = 0

    const handleFormatPrice = (price) => {
        const formattedPrice = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
        return formattedPrice
    }

    return (
        <div>
            <div className='text-center my-4'><h4>Thống kê doanh thu</h4></div>

            <select value={selectedYear} onChange={handleChangeYear}>
                <option value="">-- Chọn năm --</option>
                {years.map((year) => (
                    <option key={year} value={year}>
                        {year}
                    </option>
                ))}
            </select>
            <p>Bạn đã chọn năm: {selectedYear}</p>
            <Table striped bordered hover responsive>
                <thead>
                    <tr className="text-center">
                        <th>Tháng</th>
                        <th>Lợi Nhuận</th>

                    </tr>
                </thead>
                <tbody>
                    {
                        listDoanhThu.map((item, index) => {
                            if (item.doanh_thu_thang) {
                                item.doanh_thu_thang = Number(item.doanh_thu_thang)
                                total += item.doanh_thu_thang
                            }
                            return (

                                <tr key={index} className="text-center">

                                    <td>{`${item.id}/${selectedYear}`}</td>
                                    <td>{item.doanh_thu_thang ? handleFormatPrice(item.doanh_thu_thang) : 0}</td>

                                    {/* <td><button className='btn btn-danger mx-3' onClick={() => handleCollect(item)}>Thu tiền</button></td> */}

                                </tr>
                            )
                        })}
                    <tr className="text-center">
                        <td>Tổng cộng</td>
                        <td>{total && handleFormatPrice(total)}</td>
                    </tr>
                </tbody>
            </Table>
        </div>
    );
};


export default ChonNam;