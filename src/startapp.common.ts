import { Observable } from 'tns-core-modules/data/observable';
import * as app from 'tns-core-modules/application';
import * as dialogs from 'tns-core-modules/ui/dialogs';
import * as platformModule from "tns-core-modules/platform";
var frame = require("ui/frame");
declare var com: any;
declare var STAStartAppSDK: any;
declare var STABannerView: any;
export class Common extends Observable {
  public message: string;

  constructor() {
    super();
    let self = this;
    // this.message = Utils.SUCCESS_MSG();
      setTimeout(function() {
          self.greet();
      }, 1000);

  }

  public greet() {
      console.log('----------------------');
      console.log('start app sdk');
      console.log('----------------------');
      if (app.android) {
          const StartAppSDK = com.startapp.android.publish.adsCommon.StartAppSDK;
          StartAppSDK.init(app.android.foregroundActivity, "200315049", true);
          // Get the Main relative layout of the entire activity
          var utils = require("utils/utils");
          var context = utils.ad.getApplicationContext(); // get a reference to the application context in Android

          // Define StartApp Banner
          let startAppBanner = new com.startapp.android.publish.ads.banner.Banner(context);
          let bannerParameters =
              new android.widget.RelativeLayout.LayoutParams(
                  android.widget.RelativeLayout.LayoutParams.WRAP_CONTENT,
                  android.widget.RelativeLayout.LayoutParams.WRAP_CONTENT);
          bannerParameters.addRule(android.widget.RelativeLayout.CENTER_HORIZONTAL);
          //bannerParameters.bottomMargin = 0;
          bannerParameters.addRule(android.widget.RelativeLayout.ALIGN_PARENT_BOTTOM);
          // Add to main Layout
          // mainLayout.addView(startAppBanner, bannerParameters);
          // a Page.loaded event 'frame.topmost()' doesn't resolve to 'undefined'
          setTimeout(function() {
              //mainLayout.addView(startAppBanner, bannerParameters);
              let offset = platformModule.screen.mainScreen.scale*100 + 35;
              bannerParameters.bottomMargin = 0 - offset;
              bannerParameters.topMargin = platformModule.screen.mainScreen.heightPixels/2 + offset;
              console.log('----------------------');
              console.log("Screen height: " + platformModule.screen.mainScreen.heightPixels);
              console.log("Screen scale: " + platformModule.screen.mainScreen.scale);
              console.log(bannerParameters.bottomMargin + ' : ' + bannerParameters.topMargin);
              console.log('----------------------');
              //bannerParameters.height = 100;
              frame.topmost().currentPage.android.getParent().addView(startAppBanner, bannerParameters);
          }, 0);
      } else {
        let StartAppSDK = STAStartAppSDK.sharedInstance();
        StartAppSDK.appID = "200008368";
        let view = utils.ios.getter(UIApplication, UIApplication.sharedApplication).keyWindow.rootViewController.view;
        let bannerView = STABannerView.alloc();
        view.addSubview(bannerView);
      }



          let msg = `Your plugin is working on ${app.android ? 'Android' : 'iOS'}.`;
        return msg;
  }
}

export class Utils {
  public static SUCCESS_MSG(): string {
    let msg = `Your plugin is working on ${app.android ? 'Android' : 'iOS'}.`;

    setTimeout(() => {
      dialogs.alert(`${msg} For real. It's really working :)`).then(() => console.log(`Dialog closed.`));
    }, 2000);

    return msg;
  }
}
