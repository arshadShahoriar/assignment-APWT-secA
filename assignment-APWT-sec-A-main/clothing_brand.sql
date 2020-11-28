-- phpMyAdmin SQL Dump
-- version 5.0.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 28, 2020 at 01:52 AM
-- Server version: 10.4.14-MariaDB
-- PHP Version: 7.3.23

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `clothing brand`
--

-- --------------------------------------------------------

--
-- Table structure for table `bookmarks`
--

CREATE TABLE `bookmarks` (
  `id` int(100) NOT NULL,
  `pid` int(100) NOT NULL,
  `uid` int(100) NOT NULL,
  `date` varchar(100) NOT NULL,
  `price` int(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `bookmarks`
--

INSERT INTO `bookmarks` (`id`, `pid`, `uid`, `date`, `price`) VALUES
(16, 7, 3, '28-10-120', 1122),
(17, 1, 3, '28-10-120', 200),
(18, 1, 3, '28-10-120', 200),
(19, 1, 3, '28-10-120', 200),
(20, 6, 3, '28-10-120', 1122),
(21, 7, 3, '28-10-120', 1122),
(22, 6, 3, '28-10-120', 1122),
(23, 1, 3, '28-10-120', 200),
(25, 6, 2, '28-10-120', 1122),
(26, 1, 2, '28-10-120', 200),
(27, 1, 2, '28-10-120', 200),
(28, 6, 2, '28-10-120', 1122),
(29, 1, 2, '28-10-120', 200),
(30, 6, 2, '28-10-120', 1122),
(31, 6, 2, '28-10-120', 1122),
(32, 6, 2, '28-10-120', 1122),
(33, 6, 2, '28-10-120', 1122),
(34, 6, 2, '28-10-120', 1122),
(35, 6, 2, '28-10-120', 1122),
(36, 9, 2, '28-10-120', 2222),
(37, 10, 2, '28-10-120', 1221),
(38, 9, 2, '28-10-120', 2222),
(39, 8, 2, '28-10-120', 1232);

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `Pname` varchar(100) NOT NULL,
  `Schart` varchar(100) NOT NULL,
  `price` int(100) NOT NULL,
  `catagory` varchar(100) NOT NULL,
  `model` varchar(100) NOT NULL,
  `status` varchar(100) NOT NULL,
  `image` varchar(100) NOT NULL,
  `uid` int(100) NOT NULL,
  `description` varchar(1000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `Pname`, `Schart`, `price`, `catagory`, `model`, `status`, `image`, `uid`, `description`) VALUES
(1, 'shirt 2020', 'XL', 200, 'Male', '22334', 'available', 'test', 1, ''),
(6, 'pant34', '32', 1122, 'Male', '23432', 'available', 'Capture4.PNG', 1, 'for mens'),
(8, 'Tshirt', '33', 1232, 'Male', '23432', 'available', 'apwt.PNG', 1, 'work'),
(9, 'shari', '123', 2222, 'Female', '8998', 'available', 'Capture4.PNG', 1, 'nothing'),
(10, 'Shari_red', '123', 1221, 'Female', '23432', 'available', 'Capture21.PNG', 1, 'red');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(100) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `phone_no` varchar(100) NOT NULL,
  `gender` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `type` int(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `phone_no`, `gender`, `password`, `type`) VALUES
(1, 'arshad shahoriar', 'arshad.sshd@gmail.com', '01780523544', 'Male', '1', 1),
(2, 'customer', 'arshad.shahoriar15@gmail.com', '12345555', 'male', '1', 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `bookmarks`
--
ALTER TABLE `bookmarks`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `bookmarks`
--
ALTER TABLE `bookmarks`
  MODIFY `id` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=40;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
