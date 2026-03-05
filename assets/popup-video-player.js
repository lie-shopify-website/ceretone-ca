/*
 *	调用例子: globalPopupVideo(videoSrc);
 *	
 * 1. 全局可调用.
 * 2. 只支持 H5 video方式
*/

class PopupVideoPlayer {
	constructor() {
		this.overlay = null;
		this.videoElement = null;
		this.closeBtn = null;
		
		// 检测是否为iOS设备
		this.isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
	}
	
	
	createPlayerDOM() {
		// 创建遮罩层
		this.overlay = document.createElement('div');
		this.overlay.className = 'popup-video-overlay';
		
		// 创建关闭按钮
		this.closeBtn = document.createElement('button');
		this.closeBtn.className = 'popup-video-close';
		this.closeBtn.innerHTML = '×';
		
		// 创建视频播放器容器
		const playerContainer = document.createElement('div');
		playerContainer.className = 'popup-video-player';
		
		// 创建视频元素
		this.videoElement = document.createElement('video');
		this.videoElement.controls = true;
		this.videoElement.innerHTML = 'Error!';
		
		
		// 组装DOM结构
		playerContainer.appendChild(this.videoElement);
		this.overlay.appendChild(this.closeBtn);
		this.overlay.appendChild(playerContainer);
		
		// 添加到body
		document.body.appendChild(this.overlay);
		
		// 绑定事件
		this.bindEvents();
	}
	
	bindEvents() {
		// 绑定关闭事件
		this.closeBtn.addEventListener('click', () => this.close());
		
		// 点击遮罩层关闭
		this.overlay.addEventListener('click', (e) => {
			if (e.target === this.overlay) {
				this.close();
			}
		});
		
		// 键盘ESC键关闭
		document.addEventListener('keydown', (e) => {
			if (e.key === 'Escape' && this.overlay.style.display === 'flex') {
				this.close();
			}
		});
	}
	
	play(videoSrc) {
		// 如果播放器不存在，则创建
		if (!this.overlay || !document.body.contains(this.overlay)) {
			this.createPlayerDOM();
		}
		
		// 设置视频源
		this.videoElement.src = videoSrc;
		
		// 显示播放器
		this.overlay.style.display = 'flex';
		document.body.classList.add('no-scroll');
		
		// 触发动画
		setTimeout(() => {
			this.overlay.classList.add('active');
		}, 10);
		
		this.videoElement.muted = false;
		
		const playPromise = this.videoElement.play();
		
		if (playPromise !== undefined) {
			playPromise.then(() => {
				
			}).catch(error => {
				// 自动播放失败（通常是iOS设备）
				console.log('自动播放被阻止:', error);
			});
		}
	}
	
	close() {
		if (!this.overlay) return;
		
		// 隐藏播放器
		this.overlay.classList.remove('active');
		
		setTimeout(() => {
			this.overlay.style.display = 'none';
			document.body.classList.remove('no-scroll');
			
			// 暂停视频
			if (this.videoElement) {
				this.videoElement.pause();
				this.videoElement.currentTime = 0;
			}
		}, 300);
	}
	
	// 销毁播放器
	destroy() {
		if (this.overlay && document.body.contains(this.overlay)) {
			document.body.removeChild(this.overlay);
			this.overlay = null;
			this.videoElement = null;
			this.closeBtn = null;
		}
	}
}

const videoPlayer = new PopupVideoPlayer();
        
// 全局函数，可以在任何地方调用
window.globalPopupVideo = function(videoSrc) {
	videoPlayer.play(videoSrc);
};