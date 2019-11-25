/*
 * jquery plugin for Bootstrap 4: auto shrinks pagination (responsive)
 * https://github.com/gueff/pagShrink
 */
(function ($){

	jQuery.fn.pagShrink = function () {

		var $this = $(this);

		for(var i = 0, max = $this.length; i < max; i++)
		{
			new pagShrink($($this[i]));
		}

		/**
		 * Class
		 * @param oContainer
		 */
		function pagShrink(oContainer)
		{
			this._getWidthOfItem = function () {

				var oPageItem = $('.page-item');
				var iWidthItem = Math.round($(oPageItem[(oPageItem.length-1)]).outerWidth());

				return Math.round(iWidthItem);
			}

			this._doCuttOff = function (iFrom, iUntil) {

				iFrom = parseInt(iFrom);
				iUntil = parseInt(iUntil);

				for (var iCnt = iFrom; iCnt < iUntil; iCnt++)
				{
					$(this.oLiElement[iCnt]).hide();
				}
			}

			this._getAdjustValues = function (iRange, iPosition, iScope) {

				iRange = parseInt(iRange);
				iPosition = parseInt(iPosition);
				iScope = parseInt(iScope);

				var iHalf = parseInt(iScope / 2);
				var iLeft = parseInt(iPosition - iHalf);
				var iTakeOverfromLeft = (iLeft < 0) ? (iLeft * -1) : 0;
				var iRight = parseInt(iPosition + iHalf);
				var iTakeOverfromRight = ((iRight > iRange) ? (iRange - iRight) : 0);

				if (iTakeOverfromRight < 0)
				{
					iLeft = (iLeft + iTakeOverfromRight);
					iRight = (iRight + ((iRange - iRight)));
				}

				if (iTakeOverfromLeft > 0)
				{
					iRight = (iRight + iTakeOverfromLeft);
					iLeft = (iLeft + iTakeOverfromLeft);
				}

				return [iLeft, iRight];
			}

			this._init = function () {

				$(this.oLiElement).show();
				this.iPaginationWidth = oContainer.outerWidth();
				this.iWidthItem = this._getWidthOfItem();
				this.oLiElement = oContainer.find("li");
				this.iMaxItems = Math.round(this.iPaginationWidth / this.iWidthItem);
				this.iTooMuch = Math.round(this.oLiElement.length - this.iMaxItems);
				this.iActive = $('li.active').index();
				this.aAdjust = this._getAdjustValues(
					this.oLiElement.length,
					this.iActive,
					(this.iMaxItems - 5)
				);
				this._doCuttOff(2, (this.aAdjust[0] - 2));
				this._doCuttOff((this.aAdjust[1]), (this.oLiElement.length - 2));
			}

			//--------------------------------------
			
			this._init();
			var hTimer;

			$(window).resize(

				$.proxy(function() {

					clearTimeout(hTimer);
					hTimer = setTimeout($.proxy(function() {
						this._init()
					}, this), 100);
				}, this)
			);
		}
	};
}(jQuery));
