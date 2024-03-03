<template>
  <div class="app-right">
<!--    <div class="app-profile-box">-->
<!--      <img src="https://images.unsplash.com/photo-1587080266227-677cc2a4e76e?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=934&q=80" alt="profile">-->
<!--      <p class="app-profile-box-title name"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-user"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>Dwight Scrute</p>-->
<!--      <p class="app-profile-box-title mail"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-mail"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>dwightscrute@test.com</p>-->
<!--      <button class="archive-btn">Archive<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="feather feather-archive" viewBox="0 0 24 24">-->
<!--        <defs/>-->
<!--        <path d="M21 8v13H3V8M1 3h22v5H1zM10 12h4"/>-->
<!--      </svg></button>-->
<!--    </div>-->
    <div class="app-activity-box">
      <div class="activity-info-boxes">
        <div class="activity-info-box time">
          <div class="info-icon-wrapper">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="feather feather-clock" viewBox="0 0 24 24">
              <defs/>
              <circle cx="12" cy="12" r="10"/>
              <path d="M12 6v6l4 2"/>
            </svg>
          </div>
          <div class="info-text-wrapper">
            <span class="info-text-upper">13h</span>
            <span class="info-text-bottom">Time</span>
          </div>
        </div>
        <div class="activity-info-box atendee">
          <div class="info-icon-wrapper">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="feather feather-users" viewBox="0 0 24 24">
              <defs/>
              <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/>
              <circle cx="9" cy="7" r="4"/>
              <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/>
            </svg>
          </div>
          <div class="info-text-wrapper">
            <span class="info-text-upper">32</span>
            <span class="info-text-bottom">Atendeed</span>
          </div>
        </div>
        <div class="activity-info-box meeting">
          <div class="info-icon-wrapper">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="feather feather-calendar" viewBox="0 0 24 24">
              <defs/>
              <rect width="18" height="18" x="3" y="4" rx="2" ry="2"/>
              <path d="M16 2v4M8 2v4M3 10h18"/>
            </svg>
          </div>
          <div class="info-text-wrapper">
            <span class="info-text-upper">122</span>
            <span class="info-text-bottom">Meetings</span>
          </div>
        </div>
        <div class="activity-info-box reject">
          <div class="info-icon-wrapper">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="feather feather-x-square" viewBox="0 0 24 24">
              <defs/>
              <rect width="18" height="18" x="3" y="3" rx="2" ry="2"/>
              <path d="M9 9l6 6M15 9l-6 6"/>
            </svg>
          </div>
          <div class="info-text-wrapper">
            <span class="info-text-upper">12</span>
            <span class="info-text-bottom">Rejected</span>
          </div>
        </div>
      </div>
      <div class="activity-info-header">
        <span class="info-header-bold">在线列表</span>
        <span class=
                  "info-header-light">Activity</span>
      </div>
      <div class="activity-days-wrapper">
        <div class="day">
          <div class="chart"></div>
          <span>MON</span>
        </div>
        <div class="day">
          <div class="chart"></div>
          <span>TUE</span>
        </div>
        <div class="day current">
          <div class="chart"></div>
          <span>WED</span>
        </div>
        <div class="day">
          <div class="chart"></div>
          <span>THU</span>
        </div>
        <div class="day">
          <div class="chart"></div>
          <span>FRI</span>
        </div>
        <div class="day">
          <div class="chart"></div>
          <span>SAT</span>
        </div>
        <div class="day">
          <div class="chart"></div>
          <span>SUN</span>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: "ChatRight"
}
</script>

<style scoped>
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 4px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
}

::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background: var(--scrollbar-thumb);
}
.app-right {
  flex-basis: 320px;
  flex-shrink: 0;
  height: 100%;
  display: flex;
  flex-direction: column;
  margin-left: 24px;
  transition: 0.2s;
  overflow: auto;
}

.app-profile-box {
  border: 1px solid var(--box-border);
  background-color: var(--box-color);
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 16px;
  border-radius: 10px;
  margin-bottom: 24px;
}
.app-profile-box img {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  -o-object-fit: cover;
  object-fit: cover;
}
.app-profile-box-name {
  font-size: 16px;
  line-height: 24px;
  font-weight: 700;
  color: var(--text-dark);
  margin: 4px 0;
  display: flex;
  align-items: center;
}
.app-profile-box-title {
  font-size: 12px;
  line-height: 16px;
  color: var(--text-light);
  margin: 0;
}
.app-right .app-profile-box img {
  margin-bottom: 16px;
}
.app-right .app-profile-box-title {
  width: 100%;
  color: var(--text-dark);
  display: flex;
  align-items: center;
}
.app-right .app-profile-box-title svg {
  width: 16px;
  margin-right: 6px;
}

.archive-btn {
  color: #fff;
  height: 32px;
  margin-top: 16px;
  border-radius: 4px;
  background-color: var(--button-bg);
  display: flex;
  align-items: center;
  font-size: 14px;
  border: none;
}
.archive-btn svg {
  margin-left: 6px;
}

.app-activity-box {
  border-radius: 10px;
  padding: 16px 16px 8px 16px;
  border: 1px solid var(--box-border);
  background-color: var(--box-color);
}

.activity-info-boxes {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}

.activity-info-box {
  width: 48%;
  border-radius: 10px;
  padding: 10px;
  margin-bottom: 8px;
  display: flex;
}
.activity-info-box.time {
  background-color: var(--info-box-1);
  color: var(--info-box-color-1);
}
.activity-info-box.time .info-icon-wrapper {
  background-color: var(--info-icon-bg-1);
}
.activity-info-box.atendee {
  background-color: var(--info-box-2);
  color: var(--info-box-color-2);
}
.activity-info-box.atendee .info-icon-wrapper {
  background-color: var(--info-icon-bg-2);
}
.activity-info-box.meeting {
  background-color: var(--info-box-3);
  color: var(--info-box-color-3);
}
.activity-info-box.meeting .info-icon-wrapper {
  background-color: var(--info-icon-bg-3);
}
.activity-info-box.reject {
  background-color: var(--info-box-4);
  color: var(--info-box-color-4);
}
.activity-info-box.reject .info-icon-wrapper {
  background-color: var(--info-icon-bg-4);
}

.info-icon-wrapper {
  border-radius: 50%;
  margin-right: 4px;
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.info-icon-wrapper svg {
  width: 16px;
  height: 16px;
}

.info-text-wrapper span {
  display: block;
}

.info-text-upper {
  font-size: 14px;
  font-weight: 700;
}

.info-text-bottom {
  font-size: 10px;
  color: var(--text-light);
}

.activity-info-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 4px;
  margin-top: 16px;
}

.info-header-bold {
  font-size: 16px;
  line-height: 24px;
  font-weight: 500;
  color: var(--text-dark);
}

.info-header-light {
  color: var(--text-light);
  font-size: 12px;
  line-height: 24px;
}

.activity-days-wrapper {
  display: flex;
  justify-content: space-between;
  margin-top: 24px;
}

.day {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  height: 64px;
}
.day.current .chart {
  opacity: 1;
  transform: scale(1.2);
  transform-origin: bottom;
}
.day:first-child .chart {
  height: 20%;
}
.day:nth-child(3) .chart {
  height: 100%;
}
.day .chart {
  border-radius: 6px;
  height: 50%;
  width: 6px;
  background-color: var(--button-bg);
  opacity: 0.5;
  position: relative;
}
.day .chart:before {
  content: "";
  position: absolute;
  background-color: var(--button-bg);
  width: 6px;
  height: 6px;
  border-radius: 50%;
  top: calc(100% + 4px);
}
.day span {
  margin-top: 20px;
  display: block;
  font-size: 10px;
  color: var(--text-light);
}
</style>