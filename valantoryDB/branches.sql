-- Adminer 4.8.1 MySQL 10.6.16-MariaDB dump

SET NAMES utf8;
SET time_zone = '+00:00';
SET foreign_key_checks = 0;
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';

SET NAMES utf8mb4;

DROP TABLE IF EXISTS `branches`;
CREATE TABLE `branches` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `status` tinyint(3) unsigned NOT NULL,
  `address` varchar(255) NOT NULL,
  `is_center` tinyint(1) NOT NULL DEFAULT 1,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `branches` (`id`, `name`, `status`, `address`, `is_center`, `deleted_at`, `created_at`) VALUES
(1,	'1 saylı Bakı \"ASAN xidmət\" mərkəzi',	1,	'Azərbaycan Respublikası, Bakı, Akademik Həsən Əliyev küçəsi 36, AZ1078',	0,	NULL,	'2024-07-12 11:46:28'),
(3,	'2 saylı Bakı \"ASAN xidmət\" mərkəzi',	1,	'Azərbaycan Respublikası, Bakı, 8 Noyabr prospekti (keçmiş Nobel prospekti), 23, AMAY Ticarət mərkəzinin 2-ci mərtəbəsi, AZ1025',	0,	NULL,	'2024-07-12 11:47:16'),
(5,	'3 saylı Bakı \"ASAN xidmət\" mərkəzi',	1,	'Azərbaycan Respublikası, Bakı, A.M.Şərifzadə küç. 157, AZ1138',	0,	NULL,	'2024-07-12 11:55:30'),
(7,	'4 saylı Bakı \"ASAN xidmət\" mərkəzi',	1,	'Azərbaycan Respublikası, Bakı, Bakıxanov qəs., Sülh küç. 197, AZ 1132',	0,	NULL,	'2024-07-12 11:56:09'),
(9,	'5 saylı Bakı \"ASAN xidmət\" mərkəzi',	1,	'Azərbaycan Respublikası, Bakı şəhəri, Nizami rayonu, Heydər Əliyev prospekti 115, AZ1029',	0,	NULL,	'2024-07-12 11:57:00'),
(11,	'6 saylı Bakı \"ASAN xidmət\" mərkəzi',	1,	'Azərbaycan Respublikası, Bakı şəhəri, Xətai rayonu, V.Tau küçəsi, Heydər Əliyev parkının yaxınlığı, AZ1129',	0,	NULL,	'2024-07-12 11:57:55'),
(13,	'7 saylı Bakı \"ASAN xidmət\" mərkəzi',	1,	'Azərbaycan Respublikası, Bakı şəhəri, Nərimanov rayonu, Zaur Nudirəliyev küçəsi, 83, AZ1069',	0,	NULL,	'2024-07-12 11:59:01'),
(15,	'1 saylı Sumqayıt regional \"ASAN xidmət\" mərkəzi',	1,	'Azərbaycan Respublikası, Sumqayıt şəhəri, Bakı küçəsi, 15-ci məhəllə 42d, AZ5000',	0,	NULL,	'2024-07-12 12:15:55'),
(17,	'2 saylı Sumqayıt regional \"ASAN xidmət\" mərkəzi',	1,	'Azərbaycan Respublikası, Sumqayıt, Bulvar küçəsi, AZ 5000',	0,	NULL,	'2024-07-12 12:17:10'),
(19,	'1 saylı Gəncə regional \"ASAN xidmət\" mərkəzi',	1,	'Azərbaycan Respublikası, Gəncə, Heydər Əliyev prospekti 269, AZ2000',	0,	NULL,	'2024-07-12 12:19:16'),
(21,	'2 saylı Gəncə regional \"ASAN xidmət\" mərkəzi',	1,	'Azərbaycan Respublikası, Gəncə şəhəri, Nizami Gəncəvi prospekti, 784, AZ 2000',	0,	NULL,	'2024-07-12 12:20:02'),
(23,	'Bərdə regional \"ASAN xidmət\" mərkəzi',	1,	'Azərbaycan Respublikası, Bərdə rayonu, Heydər Əliyev prospekti 100, AZ0900',	0,	NULL,	'2024-07-12 12:22:04'),
(25,	'Sabirabad regional \"ASAN xidmət\" mərkəzi',	1,	'Azərbaycan Respublikası, Sabirabad rayonu, Heydər Əliyev prospekti 128, AZ5400',	0,	NULL,	'2024-07-12 13:32:53'),
(27,	'Qəbələ regional \"ASAN xidmət\" mərkəzi',	1,	'Azərbaycan Respublikası, Qəbələ rayonu, Elçin Kərimov 79, AZ3600',	0,	NULL,	'2024-07-12 13:41:28'),
(29,	'Masallı regional \"ASAN xidmət\" mərkəzi',	1,	'Azərbaycan Respublikası, Masallı rayonu, Heydər Əliyev prospekti, AZ4400',	0,	NULL,	'2024-07-12 13:43:54'),
(31,	'Quba regional \"ASAN xidmət\" mərkəzi',	1,	'Azərbaycan Respublikası, Quba şəhəri, Heydər Əliyev prospekti 1, AZ4000',	0,	NULL,	'2024-07-12 13:44:33'),
(33,	'Mingəçevir regional \"ASAN xidmət\" mərkəzi',	1,	'Azərbaycan Respublikası, Mingəçevir şəhəri, Heydər Əliyev prospekti 380, AZ 4500',	0,	NULL,	'2024-07-12 13:45:26'),
(35,	'İmişli regional \"ASAN xidmət\" mərkəzi',	1,	'Azərbaycan Respublikası, İmişli rayonu, Heydər Əliyev prospekti 4, AZ3000',	0,	NULL,	'2024-07-12 13:46:45'),
(37,	'Şəki regional \"ASAN xidmət\" mərkəzi',	1,	'Azərbaycan Respublikası, Şəki şəhəri, Zərifə Əliyeva küçəsi 104, AZ5500',	0,	NULL,	'2024-07-12 13:47:58'),
(39,	'Şamaxı regional \"ASAN xidmət\" mərkəzi',	1,	'Azərbaycan Respublikası, Şamaxı şəhəri, Şəhriyar qəsəbəsi, AZ5600',	0,	NULL,	'2024-07-12 13:48:32'),
(41,	'Kürdəmir regional \"ASAN xidmət\" mərkəzi',	1,	'Azərbaycan Respublikası, Kürdəmir rayonu, Atakişili kəndi, AZ3300',	0,	NULL,	'2024-07-12 13:49:39'),
(43,	'Tovuz regional \"ASAN xidmət\" mərkəzi',	1,	'Azərbaycan Respublikası, Tovuz rayonu, Aşağı Quşçu kəndi, AZ6015',	0,	NULL,	'2024-07-12 13:50:28'),
(45,	'Ağcabədi regional \"ASAN xidmət\" mərkəzi',	1,	'Azərbaycan Respublikası, Ağcabədi rayonu, Üzeyir Hacıbəyli prospekti, AZ0400',	0,	NULL,	'2024-07-12 13:51:03'),
(47,	'Balakən regional \"ASAN xidmət\" mərkəzi',	1,	'Azərbaycan Respublikası, Balakən rayonu, Heydər Əliyev prospekti 159, AZ0800',	0,	NULL,	'2024-07-12 13:52:21'),
(49,	'Salyan regional \"ASAN xidmət\" mərkəzi',	1,	'Azərbaycan Respublikası, Ələt-Astara (köhnə) avtomobil yolunun 55-ci kilometri, AZ 5206',	0,	NULL,	'2024-07-12 13:53:02'),
(51,	'Naxçıvan regional \"ASAN xidmət\" mərkəzi',	1,	'Azərbaycan Respublikası, Naxçıvan şəhəri, Seyid Cəfər Pişəvəri 7, AZ 7000',	0,	NULL,	'2024-07-12 13:53:40'),
(53,	'Lənkəran regional \"ASAN xidmət\" mərkəzi',	0,	'Azərbaycan Respublikası, Lənkəran rayonu, Qurumba kəndi, Ələt-Astara avtomobil yolu, 172-ci km, AZ4200',	0,	NULL,	'2024-07-12 13:54:14'),
(54,	'Şuşa regional \"ASAN xidmət\" mərkəzi',	1,	'Şuşa şəhəri',	0,	NULL,	'2024-07-19 10:57:47');

-- 2025-05-21 13:35:17
