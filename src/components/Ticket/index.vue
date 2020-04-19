<template>
  <div :class="style">
    <img src="@/assets/images/piao.png" v-if="!displayStyle">
    <div class="train_name">{{ train_info.trainName }}</div>
    <div class="text_jpk">检票口：</div>
    <div class="check_enter">{{ train_info.checkEnter }}</div>
    <div class="white_place"/>
    <div class="seat">{{ train_info.seat }}</div>
    <div class="seat_class">{{ train_info.seatClass }}</div>
    <div class="depart_station">{{ train_info.departStation }}</div>
    <div class="arrival_station">{{ train_info.arrivalStation }}</div>
    <div class="depart_station_english">{{ train_info.departStationEnglish }}</div>
    <div class="arrival_station_english">{{ train_info.arrivalStationEnglish }}</div>
    <div class="pointer"><img src="@/assets/images/pointer.png"></div>
    <div class="qrcode"><img src="@/assets/images/qrcode.png"></div>
    <div class="text_wang">网</div>
    <div class="price">{{ train_info.price }}</div>
    <div class="time"> {{ train_info.time }}</div>
    <div class="text_notice">（仅限当日当次车）</div>
    <div class="name">{{ train_info.name }}</div>
    <div class="idcard">{{ train_info.idCard }}</div>
    <div class="order_id">{{ train_info.orderId }}</div>
    <div class="ticket_id">{{ train_info.ticketId }}</div>
  </div>
</template>

<script>
  export default {
    name: 'Index',
    props: {
      train_info: {
        type: Object,
        default: {
          trainName: 'D2281',
          checkEnter: 'A27',
          seat: '02车07F号',
          seatClass: '二等座',
          departStation: '镇江',
          arrivalStation: '深圳北',
          departStationEnglish: 'Zhenjiang',
          arrivalStationEnglish: 'Shenzhenbei',
          price: '￥1049.0元 镇江站售',
          time: '2018年10月06日 08:21',
          name: '石文轩',
          idCard: '3211021999****6317',
          ticketId: 'Z81R046252',
          orderId: '30407300811007R046252'
        }
      },
      displayStyle: {
        type: Boolean,
        default: true
      }
    },
    data() {
      return {
        style: 'ticket_container_my'
      }
    },
    watch: {
      displayStyle: function() {
        if (this.displayStyle) {
          this.style = 'ticket_container_my'
        } else {
          this.style = 'ticket_container'
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .ticket_container_my {
    width: 583px;
    height: 356px;
    position: relative;
    background-color: rgb(215, 237, 252);
    border-width: 1px;
    border-style: solid;
    border-radius: 25px;
    border-color: #6c777d;

    .train_name {
      font-size: 26px;
      font-family: "PingFang SC", serif;
      color: rgb(0, 10, 6);
      font-weight: bold;
      line-height: 0.923;
      position: absolute;
      left: 31.96px;
      top: 44.001px;
      z-index: 20;
    }

    .text_jpk {
      font-size: 24px;
      font-family: "PingFang SC", serif;
      color: rgb(0, 10, 6);
      line-height: 1;
      position: absolute;
      left: 153.256px;
      top: 44.36px;
      z-index: 16;
    }

    .check_enter {
      font-size: 26px;
      font-family: "PingFang SC", serif;
      color: rgb(0, 10, 6);
      font-weight: bold;
      line-height: 0.923;
      position: absolute;
      left: 248px;
      top: 43.501px;
      z-index: 19;
    }

    .white_place {
      background: white;
      position: absolute;
      border-radius: 10px;
      left: 413px;
      top: 22px;
      width: 145px;
      height: 87px;
      z-index: 2;
    }

    .seat {
      text-align: right;
      font-size: 24px;
      font-family: "PingFang SC", serif;
      color: rgb(0, 10, 6);
      line-height: 1;
      position: absolute;
      right: 36px;
      top: 41.018px;
      z-index: 15;
    }

    .seat_class {
      font-size: 20px;
      font-family: "PingFang SC", serif;
      color: rgb(0, 10, 6);
      line-height: 1.2;
      position: absolute;
      left: 480.88px;
      top: 72.384px;
      z-index: 16;
    }

    .depart_station {
      font-size: 36px;
      font-weight: bold;
      font-family: "PingFang SC", serif;
      color: rgb(0, 10, 6);
      line-height: 0.667;
      position: absolute;
      left: 32.92px;
      top: 124.91px;
      z-index: 18;
    }

    .arrival_station {
      font-size: 36px;
      font-weight: bold;
      font-family: "PingFang SC", serif;
      color: rgb(0, 10, 6);
      line-height: 0.667;
      position: absolute;
      left: 272.236px;
      top: 124.91px;
      z-index: 19;
    }

    .depart_station_english {
      font-size: 18px;
      font-family: "PingFang SC", serif;
      color: rgb(153, 193, 209);
      line-height: 1.333;
      position: absolute;
      left: 32.55px;
      top: 160.631px;
      z-index: 13;
    }

    .arrival_station_english {
      font-size: 18px;
      font-family: "PingFang SC", serif;
      color: rgb(153, 193, 209);
      line-height: 1.333;
      position: absolute;
      left: 272.55px;
      top: 160.631px;
      z-index: 13;
    }

    .pointer {
      position: absolute;
      left: 155px;
      top: 130px;
      width: 75px;
      height: 19px;
      z-index: 12;
    }

    .qrcode {
      position: absolute;
      left: 475px;
      top: 171px;
      width: 84px;
      height: 86px;
      z-index: 3;
    }

    .text_wang {
      font-size: 16px;
      font-family: "PingFang SC", serif;
      color: rgb(126, 169, 183);
      line-height: 1.5;
      position: absolute;
      left: 542.575px;
      top: 140.869px;
      z-index: 8;
    }

    .price {
      text-align: right;
      font-size: 16px;
      font-family: "PingFang SC", serif;
      color: rgb(126, 169, 183);
      line-height: 1.5;
      position: absolute;
      right: 18px;
      top: 287.477px;
      z-index: 6;
    }

    .time {
      font-size: 22px;
      font-family: "PingFang SC", serif;
      color: rgb(20, 20, 30);
      font-weight: bold;
      line-height: 1.091;
      position: absolute;
      left: 32.878px;
      top: 213.364px;
      z-index: 11;
    }

    .text_notice {
      font-size: 16px;
      font-family: "PingFang SC", serif;
      color: rgb(126, 169, 183);
      line-height: 1.5;
      position: absolute;
      left: 261.292px;
      top: 213.525px;
      z-index: 4;
    }

    .name {
      font-size: 20px;
      font-family: "PingFang SC", serif;
      color: rgb(20, 20, 30);
      font-weight: bold;
      line-height: 1.2;
      position: absolute;
      left: 32.14px;
      top: 277.163px;
      z-index: 10;
    }

    .idcard {
      font-size: 20px;
      font-family: "PingFang SC", serif;
      color: rgb(20, 20, 30);
      font-weight: bold;
      line-height: 1.2;
      position: absolute;
      left: 32.2px;
      top: 305px;
      z-index: 9;
    }

    .ticket_id {
      text-align: right;
      font-size: 16px;
      font-family: "PingFang SC", serif;
      color: rgb(126, 169, 183);
      line-height: 1.5;
      position: absolute;
      top: 262.5px;
      right: 18px;
      z-index: 5;
    }

    .order_id {
      text-align: right;
      font-size: 16px;
      font-family: "PingFang SC", serif;
      color: rgb(126, 169, 183);
      line-height: 1.5;
      position: absolute;
      top: 311.5px;
      right: 18px;
      z-index: 7;
    }

  }

  .ticket_container {
    width: 583px;
    height: 356px;
    position: relative;
    /*background-color: rgb(215, 237, 252);*/
    /*border-width: 1px;*/
    /*border-style: solid;*/
    /*border-radius: 25px;*/
    /*border-color: #6c777d;*/

    .train_name {
      font-size: 26px;
      font-family: "PingFang SC", serif;
      color: rgb(0, 10, 6);
      font-weight: bold;
      line-height: 0.923;
      position: absolute;
      left: 31.96px;
      top: 44.001px;
      z-index: 20;
    }

    .text_jpk {
      font-size: 24px;
      font-family: "PingFang SC", serif;
      color: rgb(0, 10, 6);
      line-height: 1;
      position: absolute;
      left: 153.256px;
      top: 44.36px;
      z-index: 16;
    }

    .check_enter {
      font-size: 26px;
      font-family: "PingFang SC", serif;
      color: rgb(0, 10, 6);
      font-weight: bold;
      line-height: 0.923;
      position: absolute;
      left: 248px;
      top: 43.501px;
      z-index: 19;
    }

    .white_place {
      background: white;
      position: absolute;
      border-radius: 10px;
      left: 413px;
      top: 22px;
      width: 145px;
      height: 87px;
      z-index: 2;
    }

    .seat {
      text-align: right;
      font-size: 24px;
      font-family: "PingFang SC", serif;
      color: rgb(0, 10, 6);
      line-height: 1;
      position: absolute;
      right: 36px;
      top: 41.018px;
      z-index: 15;
    }

    .seat_class {
      font-size: 20px;
      font-family: "PingFang SC", serif;
      color: rgb(0, 10, 6);
      line-height: 1.2;
      position: absolute;
      left: 480.88px;
      top: 72.384px;
      z-index: 16;
    }

    .depart_station {
      font-size: 36px;
      font-weight: bold;
      font-family: "PingFang SC", serif;
      color: rgb(0, 10, 6);
      line-height: 0.667;
      position: absolute;
      left: 32.92px;
      top: 124.91px;
      z-index: 18;
    }

    .arrival_station {
      font-size: 36px;
      font-weight: bold;
      font-family: "PingFang SC", serif;
      color: rgb(0, 10, 6);
      line-height: 0.667;
      position: absolute;
      left: 272.236px;
      top: 124.91px;
      z-index: 19;
    }

    .depart_station_english {
      font-size: 18px;
      font-family: "PingFang SC", serif;
      color: rgb(153, 193, 209);
      line-height: 1.333;
      position: absolute;
      left: 32.55px;
      top: 160.631px;
      z-index: 13;
    }

    .arrival_station_english {
      font-size: 18px;
      font-family: "PingFang SC", serif;
      color: rgb(153, 193, 209);
      line-height: 1.333;
      position: absolute;
      left: 272.55px;
      top: 160.631px;
      z-index: 13;
    }

    .pointer {
      position: absolute;
      left: 155px;
      top: 130px;
      width: 75px;
      height: 19px;
      z-index: 12;
    }

    .qrcode {
      position: absolute;
      left: 475px;
      top: 171px;
      width: 84px;
      height: 86px;
      z-index: 3;
    }

    .text_wang {
      font-size: 16px;
      font-family: "PingFang SC", serif;
      color: rgb(126, 169, 183);
      line-height: 1.5;
      position: absolute;
      left: 542.575px;
      top: 140.869px;
      z-index: 8;
    }

    .price {
      text-align: right;
      font-size: 16px;
      font-family: "PingFang SC", serif;
      color: rgb(126, 169, 183);
      line-height: 1.5;
      position: absolute;
      right: 18px;
      top: 287.477px;
      z-index: 6;
    }

    .time {
      font-size: 22px;
      font-family: "PingFang SC", serif;
      color: rgb(20, 20, 30);
      font-weight: bold;
      line-height: 1.091;
      position: absolute;
      left: 32.878px;
      top: 213.364px;
      z-index: 11;
    }

    .text_notice {
      font-size: 16px;
      font-family: "PingFang SC", serif;
      color: rgb(126, 169, 183);
      line-height: 1.5;
      position: absolute;
      left: 261.292px;
      top: 213.525px;
      z-index: 4;
    }

    .name {
      font-size: 20px;
      font-family: "PingFang SC", serif;
      color: rgb(20, 20, 30);
      font-weight: bold;
      line-height: 1.2;
      position: absolute;
      left: 32.14px;
      top: 277.163px;
      z-index: 10;
    }

    .idcard {
      font-size: 20px;
      font-family: "PingFang SC", serif;
      color: rgb(20, 20, 30);
      font-weight: bold;
      line-height: 1.2;
      position: absolute;
      left: 32.2px;
      top: 305px;
      z-index: 9;
    }

    .ticket_id {
      text-align: right;
      font-size: 16px;
      font-family: "PingFang SC", serif;
      color: rgb(126, 169, 183);
      line-height: 1.5;
      position: absolute;
      top: 262.5px;
      right: 18px;
      z-index: 5;
    }

    .order_id {
      text-align: right;
      font-size: 16px;
      font-family: "PingFang SC", serif;
      color: rgb(126, 169, 183);
      line-height: 1.5;
      position: absolute;
      top: 311.5px;
      right: 18px;
      z-index: 7;
    }

  }

</style>
