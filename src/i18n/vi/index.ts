import type { BaseTranslation } from '../i18n-types'

const vi = {
    login: {
        sayHello: "Đăng nhập",
		becomeFluentFaster: "Phát triển kỹ năng tiếng Anh nhanh nhất bằng cách học 1 kèm 1 trực tuyến theo mục tiêu và lộ trình dành cho riêng bạn.",
		email: "Địa chỉ email",
		password: "Mật khẩu",
		forgotPassword: "Quên mật khẩu?",
		login: "Đăng nhập",
		orContinueWith: "Hoặc tiếp tục với",
		notAMemberYet: "Chưa có tài khoản?",
		signUp: "Đăng ký",
    },
	forgotPassword: {
		resetPassword: "Đặt lại mật khẩu",
		pleaseEnterEmail: "Vui lòng nhập email để tìm kiếm tài khoản của bạn.",
		sendResetLink: "Xác nhận",
	},
	signUp: {
		startLearning: "Đăng ký",
		alreadyHaveAnAccount: "Đã có tài khoản?",
	},	
	tutorList: {
		upcomingLesson: "Buổi học sắp diễn ra",
		enterLessonRoom: "Vào lớp học",
		totalLessonTimeIs: "Tổng số giờ bạn đã học là",
		startsIn: "còn",
		findATutor: "Tìm kiếm gia sư",
		enterTutorName: "Nhập tên gia sư...",
		vietnameseTutor: "Gia Sư Việt Nam",
		foreignTutor: "Gia Sư Nước Ngoài",
		nativeTutor: "Gia Sư Tiếng Anh Bản Ngữ",
		resetFilters: "Đặt lại bộ tìm kiếm",
		recommendedTutors: "Tìm kiếm gia sư",
		sorryWeCantFindAnyTutors: "Xin lỗi, chúng tôi không thể tìm thấy kết quả vớI từ khoá này",
		book: "Đặt lịch",
	},
	tutorDetail: {
		favorite: "Yêu thích",
		education: "Học vấn",
		languages: "Ngôn ngữ",
		specialties: "Chuyên ngành",
		interests: "Sở thích",
		teachingExperience: "Kinh nghiệm giảng dạy",
		otherReviews: "Người khác đánh giá",
		helpUsUnderStand: "Bạn đang gặp phải vấn đề gì",
		thisTutorIsAnnoying: "Gia sư này làm phiền tôi",
		thisProfileIsPretending: "Hồ sơ này là giả mạo",
		inappropriateProfilePhoto: "Ảnh hồ sơ không phù hợp",
		pleaseLetUsKnow: "Vui lòng điền thêm thông tin chi tiết vấn đề bạn gặp phải",
	},
	schedule: {
		schedule: "Lịch đã đặt",
		hereIsAList: "Đây là danh sách những khung giờ bạn đã đặt",
		youCanTrack: "Bạn có thể theo dõi khi nào buổi học bắt đầu, tham gia buổi học bằng một cú nhấp chuột hoặc có thể hủy buổi học trước 2 tiếng.",
		latestBook: "Lịch học gần nhất",
		requestForLesson: "Yêu cầu cho buổi học",
		editRequest: "Chỉnh sửa yêu cầu",
		goToMeeting: "Vào buổi học",
		currentlyThereIsNoRequest: "Hiện tại không có yêu cầu cho lớp học này. Xin vui lòng viết ra bất kỳ yêu cầu nào cho giáo viên nếu có."
	},	
	history: {
		history: "Lịch sử các buổi học",
		theFollowingIsAList: "Đây là danh sách các bài học bạn đã tham gia",
		youCanReview: "Bạn có thể xem lại thông tin chi tiết về các buổi học đã tham gia đã tham gia",
		lessonTime: "Thời gian bài học",
		noRequestForLesson: "Không có yêu cầu cho buổi học",
		tutorHaventReviewYet: "Gia sư chưa có đánh giá",
		directMessage: "Nhắn tin",
	},
	courses: {
		discoverCourses: "Discover Courses",
		liveTutorHasBuilt: "LiveTutor đã xây dựng nên các khóa học của các lĩnh vực trong cuộc sống chất lượng, bài bản và khoa học nhất cho những người đang có nhu cầu trau dồi thêm kiến thức về các lĩnh vực.",
		course: "Khoá học",
		discover: "Khám phá",
		overview: "Tổng quan",
		whyTakeThisCourse: "Tại sao bạn nên học khóa học này",
		whatWillYouBeAbleToDo: "Bạn có thể làm gì",
		experienceLevel: "Trình độ yêu cầu",
		courseLength: "Thời lượng khóa học",
		listTopics: "Danh sách chủ đề",
		topics: "Chủ đề",
		suggestedTutors: "Gợi ý gia sư",
	},
	ui: {
		hours: "giờ",
		minutes: "phút",
		lesson: "buổi học",
		lessons: "buổi học",
		cancel: "Hủy",
		report: "Báo cáo",
		review: "Đánh giá",
		addARating: "Đánh giá",
	},
	nav: {
		tutors: "Gia sư",
		schedule: "Lịch Học",
		history: "Lịch sử",
		courses: "Khóa học",
		settings: "Cài đặt",

		tutorList: "Danh sách gia sư",
		tutorDetail: "Thông tin gia sư",
	},
	language: {
		english: "Tiếng Anh",
		vietnamese: "Tiếng Việt",
	}
} satisfies BaseTranslation

export default vi
