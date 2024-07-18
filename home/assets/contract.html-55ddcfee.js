import{_ as t,r as o,o as p,c as i,b as n,d as s,e,a as l}from"./app-3495445b.js";const c={},u=n("h1",{id:"智能合约",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#智能合约","aria-hidden":"true"},"#"),s(" 智能合约")],-1),d=n("h2",{id:"概念",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#概念","aria-hidden":"true"},"#"),s(" 概念")],-1),r=n("p",null,"智能合约只是一个运行在以太坊链上的一个程序。 它是位于以太坊区块链上一个特定地址的一系列代码（函数）和数据（状态）。",-1),k=n("p",null,"智能合约也是一个以太坊帐户，我们称之为合约帐户。 这意味着它们有余额，可以成为交易的对象。 但是，他们无法被人操控，他们是被部署在网络上作为程序运行着。 个人用户可以通过提交交易执行智能合约的某一个函数来与智能合约进行交互。 智能合约能像常规合约一样定义规则，并通过代码自动强制执行。 默认情况下，你无法删除智能合约，与它们的交互是不可逆的。",-1),v={href:"https://docs.soliditylang.org/en/v0.8.26/",target:"_blank",rel:"noopener noreferrer"},b=n("h2",{id:"特征",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#特征","aria-hidden":"true"},"#"),s(" 特征")],-1),m=n("blockquote",null,[n("p",null,"无需准入性")],-1),h=n("p",null,"任何人都可以编写智能合约并将其部署到区块链网络上。 只要有足够的以太币来部署合约即可。 部署智能合约在技术上是一笔交易，因此需要为简单的以太币转账支付燃料费一样，也需要为部署智能合约支付燃料费。 但是，合约部署的燃料成本要高得多。",-1),g=n("blockquote",null,[n("p",null,"可组合性")],-1),y=n("p",null,"智能合约在以太坊上公开，并且可以看成开放应用程序接口。 这意味着可以在自己的智能合约中调用其他智能合约，以大幅扩展可能的功能。 合约甚至可以部署其他合约。",-1),q=n("blockquote",null,[n("p",null,"局限性")],-1),f=n("p",null,"智能合约本身无法获取有关“现实世界”事件的信息，因为它们无法从链下来源检索数据。 这意味着它们无法对现实世界中的事件作出响应。 这是设计使然。 因为依赖外部信息可能会影响共识，而共识对安全性和去中心化而言十分重要。然而，对于区块链应用程序来说，能够使用链下数据非常重要。",-1),_={href:"https://eips.ethereum.org/EIPS/eip-2535",target:"_blank",rel:"noopener noreferrer"},x=l(`<blockquote><p>多重签名合约</p></blockquote><p><strong>多重签名合约是需要多个有效签名才能执行交易的智能合约帐户</strong>。 这对于避免持有大量以太币或其他代币的合约出现单点故障非常有用。 多重签名还可以在多方之间划分合同执行和密钥管理的责任，并防止丢失单个私钥导致不可逆转的资金损失。 由于这些原因，多重签名合约可用于简单的去中心化自治组织治理。 多重签名需要 M 个可能的可接受签名中的 N 个签名才能执行（其中 N ≤ M，并且 M &gt; 1）。 普遍使用 <code>N = 3, M = 5</code> 和 <code>N = 4, M = 7</code>。 4/7 多重签名需要七个可能的有效签名中的四个。 这意味着即使失去了三个签名，资金仍然可以收回。 在这种情况下，这也意味着必须得到大多数密钥持有人的同意和签名才能执行合约。</p><h2 id="智能合约结构" tabindex="-1"><a class="header-anchor" href="#智能合约结构" aria-hidden="true">#</a> 智能合约结构</h2><p>智能合约是一种在以太坊某个地址上运行的程序。 它们是由数据和函数组成的，可以在收到交易时执行。 以下概述一个智能合约的组成。</p><h3 id="数据" tabindex="-1"><a class="header-anchor" href="#数据" aria-hidden="true">#</a> 数据</h3><p>任何合约数据必须分配到一个位置：要么是<code>存储</code>，要么是<code>内存</code>。 在智能合约中修改存储消耗很大，因此你需要考虑数据在哪里存取。</p><blockquote><p>存储</p></blockquote><p>持久性数据被称之为存储，由状态变量表示。 这些值被永久地存储在区块链上。 你需要声明一个类型，以便于合约在编译时可以跟踪它在区块链上需要多少存储。</p><p>这些应该就是保存在 stateDB 中的数据，是一个合约的“全局变量”，也包括合约本身数据</p><p>数据类型如下：</p><ul><li>布尔</li><li>整数（integer）</li><li>定点数（fixed point numbers）</li><li>固定大小的字节数组（fixed-size byte arrays）</li><li>动态大小的字节数组（dynamically-sized byte arrays）</li><li>有理数和整数常量（Rational and integer literals）</li><li>字符常量（String literals）</li><li>十六进制常量（Hexadecimal literals）</li><li>枚举（Enums）</li><li><code>address</code> 类型可以容纳一个以太坊地址，相当于 20 个字节或 160 位。 它以十六进制的形式返回，前导是 0x。</li></ul><blockquote><p>内存</p></blockquote><p>仅在合约函数执行期间存储的值被称为内存变量。 由于这些变量不是永久地存储在区块链上，所以它们的使用成本要低得多。可以认为是运行时数据（局部变量）。也就是程序运行栈。</p><h3 id="环境变量" tabindex="-1"><a class="header-anchor" href="#环境变量" aria-hidden="true">#</a> 环境变量</h3><p>除了在自己合约上定义的变量之外，还有一些特殊的全局变量。 它们主要用于提供有关区块链或当前交易的信息。</p><p>示例：</p><table><thead><tr><th><strong>属性</strong></th><th><strong>状态变量</strong></th><th><strong>描述</strong></th></tr></thead><tbody><tr><td><code>block.timestamp</code></td><td>uint256</td><td>当前区块的时间戳</td></tr><tr><td><code>msg.sender</code></td><td>地址</td><td>消息的发送者（当前调用）</td></tr></tbody></table><h3 id="函数" tabindex="-1"><a class="header-anchor" href="#函数" aria-hidden="true">#</a> 函数</h3><p>用最简单的术语来说，函数可以获得信息或设置信息，以响应传入的交易。</p><p>有两种函数调用方式：</p><ul><li>internal：不会创建以太坊虚拟机调用 <ul><li>Internal 函数和状态变量只能在内部访问（只能在合约内部或者从其继承的合约内部访问）。</li></ul></li><li>external：会创建以太坊虚拟机调用 <ul><li>External 函数是合约接口的一部分，这意味着他可以被其它合约和交易调用。 一个 external 函数 <code>f</code> 不可以被内部调用（即 <code>f()</code> 不行，但 <code>this.f()</code> 可以）。</li></ul></li></ul><p>它们可以是 <code>public</code> 或 <code>private</code></p><ul><li><code>public</code> 函数可以在合约内部调用或者通过消息在合约外部调用</li><li><code>private</code> 函数仅在其被定义的合约内部可见，并且在该合约的派生合约中不可见。</li></ul><p>函数和状态变量都可以被定义为 public 或 private</p><p>下面是更新合约上一个状态变量的函数：</p><div class="language-solidity line-numbers-mode" data-ext="solidity"><pre class="language-solidity"><code><span class="token comment">// Solidity example</span>
<span class="token keyword">function</span> <span class="token function">update_name</span><span class="token punctuation">(</span><span class="token builtin">string</span> value<span class="token punctuation">)</span> <span class="token keyword">public</span> <span class="token punctuation">{</span>
    dapp_name <span class="token operator">=</span> value<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li><code>string</code> 类型的参数 <code>value</code> 传入函数 <code>update_name</code></li><li>函数声明为 <code>public</code>，意味着任何人都能访问它</li><li>函数没有被声明为 <code>view</code>，因此它可以修改合约状态</li></ul><h4 id="视图函数-view-函数" tabindex="-1"><a class="header-anchor" href="#视图函数-view-函数" aria-hidden="true">#</a> 视图函数 view 函数</h4><p>这些函数保证<strong>不会修改合约数据的状态</strong>（就可以理解为只是读取合约数据）。 常见的示例是 &quot;getter&quot; 函数 - 例如，它可以用于接收用户的余额。</p><p>与之对应的还有 payable 和 pure 函数等等。。。。当一个函数被 payable 修饰，表示调用这个函数时，可以附加发送一些 ETH。pure 修饰的函数 ，不能对storage变量进行读写。view 修饰的函数，只能读取storage变量的值，不能写入。</p><div class="language-solidity line-numbers-mode" data-ext="solidity"><pre class="language-solidity"><code><span class="token keyword">function</span> <span class="token function">balanceOf</span><span class="token punctuation">(</span><span class="token builtin">address</span> _owner<span class="token punctuation">)</span> <span class="token keyword">public</span> <span class="token keyword">view</span> <span class="token keyword">returns</span> <span class="token punctuation">(</span><span class="token builtin">uint256</span> _balance<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> ownerPizzaCount<span class="token punctuation">[</span>_owner<span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这些操作被视为修改状态：</p><ol><li>写入状态变量。</li><li>正在导出事件。</li><li>创建其它合约。</li><li>使用 <code>selfdestruct</code>。</li><li>通过调用发送 ether。</li><li>调用任何未标记为 <code>view</code> 或 <code>pure</code> 的函数。</li><li>使用底层调用。</li><li>使用包含某些操作码的内联程序组。</li></ol><h4 id="构造函数" tabindex="-1"><a class="header-anchor" href="#构造函数" aria-hidden="true">#</a> 构造函数</h4><p><code>constructor</code> 函数只在首次部署合约时执行一次。 与许多基于类的编程语言中的 <code>constructor</code> 函数类似，这些函数常将状态变量初始化到指定的值。</p><div class="language-solidity line-numbers-mode" data-ext="solidity"><pre class="language-solidity"><code><span class="token comment">// 初始化合约数据，设置 \`owner\`为合约的创建者。</span>
<span class="token keyword">constructor</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">public</span> <span class="token punctuation">{</span>
    <span class="token comment">// 所有智能合约依赖外部交易来触发其函数。</span>
    <span class="token comment">// \`msg\` 是一个全局变量，包含了给定交易的相关数据，</span>
    <span class="token comment">// 例如发送者的地址和交易中包含的 ETH 数量。</span>
    owner <span class="token operator">=</span> msg<span class="token punctuation">.</span>sender<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="内置函数" tabindex="-1"><a class="header-anchor" href="#内置函数" aria-hidden="true">#</a> 内置函数</h4><p>除了自己在合约中定义的变量和函数外，还有一些特殊的内置函数。 最明显的例子是：</p><ul><li><code>address.send()</code> – Solidity</li></ul><p>这使合约可以发送以太币给其它帐户。</p><h2 id="事件和日志" tabindex="-1"><a class="header-anchor" href="#事件和日志" aria-hidden="true">#</a> 事件和日志</h2><p>事件是以太坊虚拟机(EVM)日志基础设施提供的一个便利接口。当被发送事件（调用）时，会触发参数存储到交易的日志中（一种区块链上的特殊数据结构）。这些日志与合约的地址关联，并记录到区块链中。</p><p>来捋这个关系：区块链是打包一系列交易的区块组成的链条，每一个交易“收据”会包含0到多个日志记录，日志代表着智能合约所触发的事件。</p><p><strong>在DAPP的应用中，如果监听了某事件，当事件发生时，会进行回调。</strong> 不过要注意：日志和事件在合约内是无法被访问的，即使是创建日志的合约。</p><p>事件可以让你通过前端或其它订阅应用与你的智能合约通信。 当交易被挖矿执行时，智能合约可以触发事件并且将日志写入区块链，然后前端可以进行处理。</p><p>**如果函数会触发事件，则不能将其定义为<code>view</code>或<code>pure</code>。**这是因为触发事件会将数据写入区块链（到日志中）。</p><p>事件的参数可以使用 indexed 关键字（一个事件最多只能 3 个），从而构成 topics，变成可检索的日志。</p><p>比如：</p><div class="language-solidity line-numbers-mode" data-ext="solidity"><pre class="language-solidity"><code><span class="token comment">// 事件允许在区块链上记录活动。</span>
<span class="token comment">// 以太坊客户端可以监听事件，以便对合约状态更改作出反应。</span>
<span class="token comment">// 了解更多： https://solidity.readthedocs.io/en/v0.5.10/contracts.html#events</span>
<span class="token keyword">event</span> <span class="token function">Transfer</span><span class="token punctuation">(</span><span class="token builtin">address</span> <span class="token keyword">from</span><span class="token punctuation">,</span> <span class="token builtin">address</span> to<span class="token punctuation">,</span> <span class="token builtin">uint</span> amount<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>可以在函数内触发事件，记录日志</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token comment">// 从任何调用者那里发送一定数量的代币到一个地址。</span>
function <span class="token function">transfer</span><span class="token punctuation">(</span>address receiver<span class="token punctuation">,</span> <span class="token builtin">uint</span> amount<span class="token punctuation">)</span> public <span class="token punctuation">{</span>
    <span class="token comment">// 发送者必须有足够数量的代币用于发送</span>
    <span class="token function">require</span><span class="token punctuation">(</span>amount <span class="token operator">&lt;=</span> balances<span class="token punctuation">[</span>msg<span class="token punctuation">.</span>sender<span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token string">&quot;Insufficient balance.&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">// 调整两个帐户的余额</span>
    balances<span class="token punctuation">[</span>msg<span class="token punctuation">.</span>sender<span class="token punctuation">]</span> <span class="token operator">-=</span> amount<span class="token punctuation">;</span>
    balances<span class="token punctuation">[</span>receiver<span class="token punctuation">]</span> <span class="token operator">+=</span> amount<span class="token punctuation">;</span>
    <span class="token comment">// 触发之前定义的事件。</span>
    emit <span class="token function">Transfer</span><span class="token punctuation">(</span>msg<span class="token punctuation">.</span>sender<span class="token punctuation">,</span> receiver<span class="token punctuation">,</span> amount<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="bin-abi" tabindex="-1"><a class="header-anchor" href="#bin-abi" aria-hidden="true">#</a> bin&amp;abi</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>solc <span class="token parameter variable">--abi</span> <span class="token parameter variable">--bin</span> <span class="token parameter variable">-o</span> ./dir xxx.sol
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>在以太坊智能合约的开发过程中，编译智能合约会生成两种重要的文件：<code>bin</code> 文件和 <code>abi</code> 文件。每个文件都有特定的用途和内容。</p><blockquote><p><code>bin</code> 文件</p></blockquote><p><code>bin</code> 文件包含智能合约的字节码（Bytecode）。<strong>字节码是智能合约在以太坊虚拟机（EVM）上执行的==机器级代码==</strong>。当智能合约被部署到以太坊网络上时，部署的实际上是这个字节码。</p><ul><li><strong>生成方式</strong>: 使用 Solidity 编译器（如 <code>solc</code>）编译智能合约源码时生成。</li><li><strong>用途</strong>: 部署智能合约到以太坊网络，并在网络上运行合约代码。</li></ul><blockquote><p><code>abi</code> 文件</p></blockquote><p><code>abi</code> 文件包含应用二进制接口（Application Binary Interface）。<strong>ABI 描述了智能合约的接口，包括其可调用的函数及其参数、返回值类型、事件等</strong>。ABI 是以 JSON 格式表示的。</p><ul><li><strong>生成方式</strong>: 使用 Solidity 编译器（如 <code>solc</code>）编译智能合约源码时生成。</li><li><strong>用途</strong>: 允许前端应用程序与智能合约进行交互，了解如何调用合约的函数和解析返回值。</li></ul><blockquote><p>示例</p></blockquote><div class="language-solidity line-numbers-mode" data-ext="solidity"><pre class="language-solidity"><code><span class="token comment">// SimpleStorage.sol</span>
<span class="token keyword">pragma</span> <span class="token keyword">solidity</span> <span class="token operator">^</span><span class="token version number">0.8.0</span><span class="token punctuation">;</span>

<span class="token keyword">contract</span> <span class="token class-name">SimpleStorage</span> <span class="token punctuation">{</span>
    <span class="token builtin">uint256</span> storedData<span class="token punctuation">;</span>

    <span class="token keyword">function</span> <span class="token function">set</span><span class="token punctuation">(</span><span class="token builtin">uint256</span> x<span class="token punctuation">)</span> <span class="token keyword">public</span> <span class="token punctuation">{</span>
        storedData <span class="token operator">=</span> x<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">function</span> <span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">public</span> <span class="token keyword">view</span> <span class="token keyword">returns</span> <span class="token punctuation">(</span><span class="token builtin">uint256</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> storedData<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>编译后的 <code>bin</code> 文件（简化版）</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>608060405234801561001057600080fd5b506101...

（这是一段很长的字节码）
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>编译后的 <code>abi</code> 文件</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code><span class="token punctuation">[</span>
    <span class="token punctuation">{</span>
        <span class="token property">&quot;constant&quot;</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
        <span class="token property">&quot;inputs&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
            <span class="token punctuation">{</span>
                <span class="token property">&quot;name&quot;</span><span class="token operator">:</span> <span class="token string">&quot;x&quot;</span><span class="token punctuation">,</span>
                <span class="token property">&quot;type&quot;</span><span class="token operator">:</span> <span class="token string">&quot;uint256&quot;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">]</span><span class="token punctuation">,</span>
        <span class="token property">&quot;name&quot;</span><span class="token operator">:</span> <span class="token string">&quot;set&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;outputs&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
        <span class="token property">&quot;payable&quot;</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
        <span class="token property">&quot;stateMutability&quot;</span><span class="token operator">:</span> <span class="token string">&quot;nonpayable&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;type&quot;</span><span class="token operator">:</span> <span class="token string">&quot;function&quot;</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span>
        <span class="token property">&quot;constant&quot;</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
        <span class="token property">&quot;inputs&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
        <span class="token property">&quot;name&quot;</span><span class="token operator">:</span> <span class="token string">&quot;get&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;outputs&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
            <span class="token punctuation">{</span>
                <span class="token property">&quot;name&quot;</span><span class="token operator">:</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">,</span>
                <span class="token property">&quot;type&quot;</span><span class="token operator">:</span> <span class="token string">&quot;uint256&quot;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">]</span><span class="token punctuation">,</span>
        <span class="token property">&quot;payable&quot;</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
        <span class="token property">&quot;stateMutability&quot;</span><span class="token operator">:</span> <span class="token string">&quot;view&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;type&quot;</span><span class="token operator">:</span> <span class="token string">&quot;function&quot;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>总结</p></blockquote><ul><li><strong><code>bin</code> 文件</strong>: 包含智能合约的字节码，用于部署合约。</li><li><strong><code>abi</code> 文件</strong>: 包含智能合约的接口描述，用于与合约进行交互。</li></ul><p>这两个文件在智能合约的开发和使用过程中都至关重要。字节码用于将合约部署到区块链上，而 ABI 则用于与已经部署的合约进行交互。</p>`,69);function w(S,B){const a=o("ExternalLinkIcon");return p(),i("div",null,[u,d,r,k,n("p",null,[s("一般用 solidity 语言编写，"),n("a",v,[s("官网"),e(a)])]),b,m,h,g,y,q,f,n("p",null,[s("智能合约的另一个限制是最大合约大小。 智能合约最大可达 24 KB，否则会消耗完燃料。 可以使用"),n("a",_,[s("钻石模式"),e(a)]),s("来规避它。")]),x])}const I=t(c,[["render",w],["__file","contract.html.vue"]]);export{I as default};
