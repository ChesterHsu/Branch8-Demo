import poll from '@/js/poll.json';

export default {
  data: () => ({
    polls: [],
    dashboardData: [],
    totalVotes: 0,
    agreeType: [],
    disagreeType: [],
    showDashboard: false,
    dashboardPerCent: 0,
    dashboardAngle: '',
  }),
  watch: {
    // 判斷 dashboardData 是否有選取值 若有則帶入投票區塊
    dashboardData(value) {
      if (value !== null || value !== undefined||value !== "") {
        this.showDashboard = true;
      }
    }
  },
  mounted() {
    this.getPolls()
  },
  methods: {
    getPolls() {
      // 渲染投票主題區塊
      this.polls = poll.polls;
      // 儲存投票人數進vuex
      const setVotersOptions = [];
      this.polls.forEach((items) => {
        setVotersOptions.push({
          id: items.id,
          options: items.answer.options,
        })
      })
      this.$store.commit("setVotersOptions", setVotersOptions)
    },

    // 取得點選後的投票選單
    setPolls(val) {
      this.dashboardData = val;
      this.getVoteOptions(val.id)
      this.calculationVotes();
      this.calculationPerCent();
    },
    // 取得 voters option 基本資訊
    getVoteOptions(id) {
      const votersOptions = this.$store.state.numberOfVoters.filter((voters) => {
        return voters.id === id;
      })
      // 判斷options 選項
      votersOptions[0].options.forEach((option, index) =>{
        if (index === 0) {
          this.agreeType = option;
        } else if (index === 1) {
          this.disagreeType = option;
        }
      })
    },
    // 計算投票數
    calculationVotes() {
      this.totalVotes = this.agreeType.numberOfVoters + this.disagreeType.numberOfVoters;
    },
    // 計算dashboard動態顯示所需公式
    calculationPerCent() {
      let perCent = this.agreeType.numberOfVoters / this.totalVotes;
      perCent = perCent.toFixed(2)
      this.dashboardPerCent = perCent * 600;
      // 換算dashboard 角度
      const angle = 90 - (this.dashboardPerCent - 300)/100 * 30;
      this.dashboardAngle = 'rotate(-'+angle.toString()+' 115 115)'
    },
    agreeBtn() {
      this.$store.state.numberOfVoters.filter((voters,index) => {
        if (voters.id === this.dashboardData.id) {
          this.$store.commit("changeAgree", index)
        }
      })
      this.calculationVotes();
      this.calculationPerCent();
    },
    disagreeBtn() {
      this.$store.state.numberOfVoters.filter((voters,index) => {
        if (voters.id === this.dashboardData.id) {
          this.$store.commit("changeDisagree", index)
        }
      })
      this.calculationVotes();
      this.calculationPerCent();
    },
  }
}
