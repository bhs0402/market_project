package com.bhs.sssss.controllers;

import com.bhs.sssss.entities.CategoryEntity;
import com.bhs.sssss.entities.MemberEntity;
import com.bhs.sssss.services.ItemService;
import com.bhs.sssss.services.MemberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.SessionAttribute;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class HomeController {

    @RequestMapping(value = "/main", method = RequestMethod.GET, produces = MediaType.TEXT_HTML_VALUE)
    public ModelAndView getIndex(@SessionAttribute(value = "member", required = false)MemberEntity member) {

        ModelAndView modelAndView = new ModelAndView();
        modelAndView.addObject("member", member);
        modelAndView.setViewName("main/index");
        return modelAndView;
    }

    @RequestMapping(value = "/market-benefit", method = RequestMethod.GET, produces = MediaType.TEXT_HTML_VALUE)
    public ModelAndView getMarketBenefit(@SessionAttribute(value = "member", required = false)MemberEntity member) {
        ModelAndView modelAndView = new ModelAndView();
        modelAndView.addObject("member", member);
        modelAndView.setViewName("/market-benefit/market-benefit");
        return modelAndView;
    }

}
