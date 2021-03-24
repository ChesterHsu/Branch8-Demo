<template>
  <div class="index">
    <div class="warp" v-if="!showDashboard">
      <h3 class="hideDashboardWarning">
        There are no voting items,
      </h3>
      <h3 class="hideDashboardWarning">
        please select the following area to choose
      </h3>
    </div>
    <div class="warp" v-if="showDashboard">
      <div class="dashboard-warp">
        <div class="per-cent-number">
          <p class="agree-number">{{ agreeType.numberOfVoters }}</p>
          <p class="disagree-number">{{ disagreeType.numberOfVoters }}</p>
          <p class="per-cent">%</p>
        </div>
        <svg class="dashboard" width="230" height="230">
          <circle
            fill="none"
            stroke="#133b6b"
            stroke-width="100"
            :transform="dashboardAngle"
            :stroke-dashoffset="dashboardPerCent"
            cx="115"
            cy="115"
            r="95"
          >
          </circle>
          <circle
            class="test"
            fill="#dbdbdb"
            cx="115"
            cy="115"
            r="45"
          >
          </circle>
        </svg>
      </div>
      <div class="title">
        <img src="@/assets/images/logo.png">
        <h3>Today's Poll</h3>
      </div>
      <br>
      <div class="content">
        <h3>{{ dashboardData.title }}</h3>
        <p>17 JAN 2018</p>
      </div>
      <div class="vote-btn">
        <button class="agree-btn" @click="agreeBtn">{{ agreeType.label }}</button>
        <br/>
        <button class="disagree-btn" @click="disagreeBtn">{{ disagreeType.label }}</button>
      </div>
      <div class="number-of-voters">
        <p>Total number of voters recorded: {{ totalVotes }}</p>
      </div>
      <hr size="1"/>
    </div>
    <div class="survey-content" v-for="item in polls" @click="setPolls(item)">
      <div class="content">
        <img src="@/assets/images/dashboard-image.png">
        <p>15 JAN 2018</p>
        <br />
        <h3>{{ item.title }}</h3>
      </div>
    </div>
  </div>
</template>

<script src="../js/pages/index.js">

</script>
