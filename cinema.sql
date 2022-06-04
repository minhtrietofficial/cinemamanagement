-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 03, 2022 at 08:41 AM
-- Server version: 10.4.21-MariaDB
-- PHP Version: 8.0.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `cinema`
--
CREATE DATABASE `cinema`;
USE `cinema`;

-- --------------------------------------------------------

--
-- Table structure for table `ghelichchieu`
--

CREATE TABLE `ghelichchieu` (
  `IDLichChieu` int(11) NOT NULL,
  `SoGhe` varchar(10) NOT NULL,
  `TrangThai` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `ghephongchieu`
--

CREATE TABLE `ghephongchieu` (
  `IDPhongChieu` int(11) NOT NULL,
  `SoGhe` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `lichchieu`
--

CREATE TABLE `lichchieu` (
  `IDLichChieu` int(11) NOT NULL,
  `IDPhim` int(11) NOT NULL,
  `ThoiGianBatDau` time NOT NULL,
  `ThoiGianketThuc` time NOT NULL,
  `NgayChieu` date NOT NULL,
  `IDPhongChieu` int(11) NOT NULL,
  `GiaVe` int(11) NOT NULL,
  `HinhThuc` varchar(30) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `phim`
--

CREATE TABLE `phim` (
  `IDPhim` int(11) NOT NULL,
  `TenPhim` varchar(30) DEFAULT NULL,
  `DaoDien` varchar(30) DEFAULT NULL,
  `TheLoai` varchar(30) DEFAULT NULL,
  `NhaPhatHanh` varchar(30) DEFAULT NULL,
  `KhoiChieu` date NOT NULL,
  `KetThuc` date NOT NULL,
  `ThoiLuong` time NOT NULL,
  `NgonNgu` varchar(30) DEFAULT NULL,
  `Rated` varchar(10) DEFAULT NULL,
  `NSX` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `phongchieu`
--

CREATE TABLE `phongchieu` (
  `IDPhongChieu` int(11) NOT NULL,
  `SoGhe` int(11) DEFAULT 0,
  `TenPhongChieu` varchar(30) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `taikhoan`
--

CREATE TABLE `taikhoan` (
  `Email` varchar(50) NOT NULL,
  `HoTen` varchar(50) NOT NULL,
  `SoDienThoai` varchar(12) NOT NULL,
  `LoaiTaiKhoan` int(11) NOT NULL DEFAULT 0,
  `ChiNhanh` varchar(30) DEFAULT NULL,
  `MatKhau` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `ve`
--

CREATE TABLE `ve` (
  `IDVe` int(11) NOT NULL,
  `IDPhim` int(11) NOT NULL,
  `IDLichChieu` int(11) NOT NULL,
  `Email` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `lichchieu`
--
ALTER TABLE `lichchieu`
  ADD PRIMARY KEY (`IDLichChieu`);

--
-- Indexes for table `phim`
--
ALTER TABLE `phim`
  ADD PRIMARY KEY (`IDPhim`);

--
-- Indexes for table `phongchieu`
--
ALTER TABLE `phongchieu`
  ADD PRIMARY KEY (`IDPhongChieu`);

--
-- Indexes for table `taikhoan`
--
ALTER TABLE `taikhoan`
  ADD PRIMARY KEY (`Email`);

--
-- Indexes for table `ve`
--
ALTER TABLE `ve`
  ADD PRIMARY KEY (`IDVe`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `lichchieu`
--
ALTER TABLE `lichchieu`
  MODIFY `IDLichChieu` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `phim`
--
ALTER TABLE `phim`
  MODIFY `IDPhim` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `phongchieu`
--
ALTER TABLE `phongchieu`
  MODIFY `IDPhongChieu` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `ve`
--
ALTER TABLE `ve`
  MODIFY `IDVe` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
