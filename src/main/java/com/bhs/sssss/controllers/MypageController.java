package com.bhs.sssss.controllers;

import com.bhs.sssss.entities.MemberEntity;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.SessionAttribute;
import org.springframework.web.servlet.ModelAndView;

@Controller
@RequestMapping(value = "/mypage")
public class MypageController {

    @RequestMapping(value = "/info", method = RequestMethod.GET, produces = MediaType.TEXT_HTML_VALUE)
    public ModelAndView getInfo(@SessionAttribute(value = "member")MemberEntity member) {
        ModelAndView modelAndView = new ModelAndView();
        modelAndView.addObject("member", member);
        modelAndView.setViewName("mypage/info");
        return modelAndView;
    }
}
