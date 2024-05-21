// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

import "hardhat/console.sol";

contract KunVote {

    // 投票人
    struct VoteDataRow {
        // 是否已经投票
        bool voted;
        // 投票人id
        address id;
        // 选项,1=真ikun,2=小黑子,3=纯鹿人
        uint option;
    }

    struct PageData {
        bool voted;
        uint[] tickets;
    }

    mapping(address => VoteDataRow) public voters;

    // 得票总数，按枚举顺序存储不同option的票数
    uint[] public tickets  = [0,0,0];

    constructor(){

    }

    // 投票
    function vote(uint option) public  returns (uint[] memory){
        VoteDataRow storage row = voters[msg.sender];
        require(!row.voted,"you already voted");

        row.id = msg.sender;
        row.option = option;
        row.voted = true;
        tickets[option - 1] += 1;
        return tickets;
    }

    function calc() public view returns (PageData memory){
        VoteDataRow memory row = voters[msg.sender];
        PageData memory pageData = PageData({
            voted : row.voted,
            tickets : tickets
        });
        return pageData;
    }

}