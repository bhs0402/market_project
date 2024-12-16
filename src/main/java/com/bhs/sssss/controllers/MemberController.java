package com.bhs.sssss.controllers;

import com.bhs.sssss.entities.MemberEntity;
import com.bhs.sssss.results.CommonResult;
import com.bhs.sssss.results.Result;
import com.bhs.sssss.services.MemberService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpRequest;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import java.net.http.HttpClient;

@Controller
@RequestMapping(value = "/member")
public class MemberController {
    private final MemberService memberService;

    @Autowired
    public MemberController(MemberService memberService) {
        this.memberService = memberService;
    }

    @RequestMapping(value = "/login", method = RequestMethod.GET, produces = MediaType.TEXT_HTML_VALUE)
    public ModelAndView getLogin() {
        ModelAndView modelAndView = new ModelAndView();
        modelAndView.setViewName("member/login");
        return modelAndView;
    }

    @RequestMapping(value = "/login", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public String postLogin(HttpServletRequest request, MemberEntity member) {
        HttpSession session = request.getSession();
        Result result = this.memberService.login(member);
        if(result == CommonResult.SUCCESS){
            session.setAttribute("member", member);
        }
        JSONObject response = new JSONObject();
        response.put(Result.NAME, result.nameToLower());
        return response.toString();
    }

    @RequestMapping(value = "/signup", method = RequestMethod.GET, produces = MediaType.TEXT_HTML_VALUE)
    public ModelAndView getSignup() {
        ModelAndView modelAndView = new ModelAndView();
        modelAndView.setViewName("/member/signup");
        return modelAndView;
    }

    @RequestMapping(value = "/signup", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public String postSignup(MemberEntity member) {
        Result result = this.memberService.signup(member);
        JSONObject response = new JSONObject();
        response.put(Result.NAME, result.nameToLower());
        return response.toString();
    }


    @RequestMapping(value = "/duplication-check", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public String duplicationCheck(@RequestParam(value = "contact", required = false) String contact,
                                   @RequestParam(value = "memberId", required = false) String memberId,
                                   @RequestParam(value = "email", required = false) String email) {
        JSONObject response = new JSONObject();
        Result result = this.memberService.duplicationCheck(contact, memberId, email);
        response.put(Result.NAME, result.nameToLower());
        return response.toString();
    }

    @RequestMapping(value = "/logout", method = RequestMethod.GET)
    public ModelAndView getLogout(HttpSession session) {
        session.setAttribute("member", null);
        ModelAndView modelAndView = new ModelAndView();
        modelAndView.setViewName("redirect:/main");
        return modelAndView;
    }

}
